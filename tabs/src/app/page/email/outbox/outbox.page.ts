import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; //弹出组件
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.page.html',
  styleUrls: ['./outbox.page.scss'],
})
export class OutboxPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public modalController: ModalController, //弹出组件
    public alertController: AlertController,
    public storageService: StorageService,
    public toastCtrl: ToastController,
    public commonService: CommonService
  ) { }

  public user_Id: string; //用户的id
  public emailList2:any[]=[]; //存储最初数据库读出来的信件消息
  public emaildetail:any[]=[];
  public emailList:any[]=[];  //存储最后处理过的信件消息
  public authtoken = this.storageService.get('authtoken');


  ngOnInit() {
    console.log(location.pathname);
    this.user_Id = location.pathname.substring(8);
    console.log(this.user_Id);
    this.getUserEmailList();
  }

  //跳转到写信页面
  addEmail(){
    // this.router.navigate(['/emailwrite/',this.user_Id]);
    this.router.navigate(['/emailwrite/',1]);
  }

    //搜索用户收到的邮件
    getUserEmailList(){
      this.emailList2 = [];
      this.emaildetail = [];
      this.emailList = [];
      // this.getHistory();
      var api = '/api/Message/GetSendMessage?authtoken='+this.authtoken+'&userId='+this.user_Id;
      this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
          //获取该用户发出的信件赋值给emailList2
          this.emailList2 = response.info;  
          //循环一遍将用户ID和文件ID存入
          this.emailList2.forEach((element,index) => { 
            this.emaildetail.push({"realName":element.sender,"isReaded":element.id}); 
            this.emailList.push({"id":element.id,"realName":"",sender:element.sender,"isReaded":"",
                   "subject":element.subject,"body":element.body,"isImportant":element.isImportant,
                   "sendTime":element.sendTime,"isDel":element.isDel,"isRecycle":element.isRecycle});
          });
          //遍历emaildetail将信件的id替换成信件是否已读信息
          this.emaildetail.forEach((element,index) => {
            var api3 = '/api/Message/GetMessageReceiveById?authtoken='+this.authtoken +'&id='+element.isReaded;
            this.commonService.get(api3).then((response3: any) => {
              if (response3.retcode == 0) {
                  element.realName = response3.info.receiver;
                  this.emailList[index].isReaded = response3.info.isReaded;
                  this.emailList[index].sendTime = this.emailList[index].sendTime.substring(0,16);
                  this.emailList[index].sendTime = this.emailList[index].sendTime.replace('T',' ');
                  //遍历emaildetail将收件人id替换成真实姓名
                  var api2 = '/api/Users/GetStudent?authtoken='+this.authtoken +'&id='+element.realName;
                  this.commonService.get(api2).then((response2: any) => {
                    if (response2.retcode == 0) {
                        element.realName = response2.info.realName;
                        this.emailList[index].realName = response2.info.realName;
                    } else {
                      this.toastTip('参数错误','danger');
                      return;
                    }
                  });

              } else {
                this.toastTip('参数错误','danger');
                return;
              }
            });
          });
          console.log(this.emaildetail);
          console.log(this.emailList);
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
      });
  
    }

  //点击进入查看邮件
  checkEmail(id:any){
    console.log('查看邮件'+id);
    this.router.navigate(['/showemail/', id]);
  }

  // 长按触发删除邮件事件
  async delete(id: any) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要删除吗!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消删除');//这里是否还需要加一个刷新页面的功能？
          }
        }, {
          text: '确定',
          handler: () => {
            this.deleteEmail(id);
          }
        }
      ]
    });
    await alert.present();
  }

  //自定义邮件删除函数
  deleteEmail(ids:any){
    console.log(ids + '确认删除');
    var api = '/api/Message/DeleteMessageHasSend?authtoken='+this.authtoken +'&id='+ids;
    this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
          console.log("delete success"+ids);
          this.toastTip('该邮件成功删除','success');
          this.getUserEmailList();
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
    });
  }

  // 返回上一层
  goBack() {
    this.router.navigate(['/tabs/tab2/']);
  }

  // 弹窗设置
  async toastTip(message: string, color: string) {
    const toast = await this.toastCtrl.create({
        message,
        duration: 1000,
        position: 'top',
        cssClass: 'errToast',
        color,
    });
    toast.present();
  }


}
