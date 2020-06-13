import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { Router } from '@angular/router';

@Component({
  selector: 'app-dustbin',
  templateUrl: './dustbin.page.html',
  styleUrls: ['./dustbin.page.scss'],
})
export class DustbinPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public storageService: StorageService,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public commonService: CommonService
  ) { }

  public iskong=false;  //判断是否收到邮件
  public user_Id: string; //用户的id
  public emailList2:any[]=[]; //存储最初数据库读出来的信件消息
  public emaildetail:any[]=[];
  public emailList:any[]=[];  //存储最后处理过的信件消息
  public authtoken = this.storageService.get('authtoken');

  ngOnInit() {
    console.log(location.pathname);
    this.user_Id = location.pathname.substring(9);
    console.log(this.user_Id);
    this.getUserEmailList();//获取该用户放在回收站中的邮件
  }

  //搜索用户放在回收站中的邮件
  getUserEmailList(){
    this.emailList2 = [];
    this.emaildetail = [];
    this.emailList = [];
    // this.getHistory();
    var api = '/api/Message/GetRecycleMessage?authtoken='+this.authtoken+'&userId='+this.user_Id;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        //获取该用户收到的信件赋值给emailList2
        this.emailList2 = response.info;  
        console.log(this.emailList2);
        //循环一遍将用户ID和文件ID存入
        this.emailList2.forEach((element,index) => { 
          this.emaildetail.push({"realName":element.sender,"isReaded":element.id}); 
          this.emailList.push({"id":element.id,"realName":"",sender:element.sender,"isReaded":"",
                 subject:element.subject,body:element.body,isImportant:element.isImportant,
                 sendTime:element.sendTime,isDel:element.isDel,isRecycle:element.isRecycle});
        });
        //遍历emaildetail将发信人id替换成真实姓名
        this.emaildetail.forEach((element,index) => {
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
        });
        //遍历emaildetail将信件的id替换成信件是否已读信息
        this.emaildetail.forEach((element,index) => {
          var api3 = '/api/Message/GetMessageReceiveById?authtoken='+this.authtoken +'&id='+element.isReaded;
          this.commonService.get(api3).then((response3: any) => {
            if (response3.retcode == 0) {
                element.isReaded = response3.info.isReaded;
                this.emailList[index].isReaded = response3.info.isReaded;
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

  //将邮件返回到收件箱inbox中
  backToinbox(ids:any){
     console.log(ids + '返回收件箱');

     var api = '/api/Message/MessageBackReceive?authtoken='+this.authtoken +'&id='+ids;
     this.commonService.get(api).then((response: any) => {
       if (response.retcode == 0) {
         this.toastTip('邮件还原成功','success');
         this.getUserEmailList();
       } else {
         this.toastTip('参数错误','danger');
         return;
       }
     });     

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
    var api = '/api/Message/DeleteMessagetoEnd?authtoken='+this.authtoken +'&id='+ids;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        this.toastTip('文件成功删除','success');
        this.getUserEmailList();
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
