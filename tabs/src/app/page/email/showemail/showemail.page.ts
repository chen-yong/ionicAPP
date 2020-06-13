import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-showemail',
  templateUrl: './showemail.page.html',
  styleUrls: ['./showemail.page.scss'],
})
export class ShowemailPage implements OnInit {

  constructor(
    public storageService: StorageService,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public router: Router,
    public commonService: CommonService
  ) { }

  public email_id;
  public user_id;
  public authtoken = this.storageService.get('authtoken');
  public emaildetail:any={
    "id":1,   //邮件id
    "sender":1,  //发件人id
    "code":"",
    "subject":"",  //主题
    "body":"",   //内容
    "isImportant":false,//是否重要
    "sendTime":"",  //发送时间
    "isDel":false,   
    "isRecycle":false,
    "sendName":"", //发件人真实姓名
    "receiver":1,  //收件人ID
    "receiveName":"",//收件人真实姓名
    "isReaded":""
  };

  ngOnInit() {
    console.log(location.pathname);
    this.email_id = location.pathname.substring(11);
    console.log(this.email_id);
    this.getEmail();
  }

  //搜索用户收到的邮件
  getEmail(){
    this.getUserList();
    //首先根据 emailId获取pemessage的信息
    var api = '/api/Message/GetMessageById?authtoken='+this.authtoken +'&id='+this.email_id;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        this.emaildetail.id = this.email_id;
        this.emaildetail.sender = response.info.sender;
        this.emaildetail.code = response.info.code;
        this.emaildetail.subject = response.info.subject;
        this.emaildetail.body = response.info.body;
        this.emaildetail.isImportant = response.info.isImportant;
        this.emaildetail.sendTime = response.info.sendTime;     
        this.getEmaildetailPerfect();//补全信息
        if(this.user_id!=this.emaildetail.sender){
           this.hasRead();
        }
      } else {
        this.toastTip('参数错误1','danger');
        return;
      }
    });
  }

  getUserList(){
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+this.authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
        this.user_id = response.info.id;
        console.log("用户id:"+this.user_id);
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });
  }
  
  //补全信息
  getEmaildetailPerfect(){
    //补全发送人姓名
    var api2 = '/api/Users/GetStudent?authtoken='+this.authtoken +'&id='+this.emaildetail.sender;
    this.commonService.get(api2).then((response: any) => {
      if (response.retcode == 0) {
        this.emaildetail.sendName = response.info.realName;     
      } else {
        this.toastTip('参数错误2','danger');
        return;
      }
    });    
    //补全接件人id和是否已读
    var api3 = '/api/Message/GetMessageReceiveById?authtoken='+this.authtoken +'&Id='+this.email_id;
    this.commonService.get(api3).then((response: any) => {
      if (response.retcode == 0) {
        this.emaildetail.receiver = response.info.receiver;
        this.emaildetail.isReaded = response.info.isReaded;
        this.emaildetail.isDel = response.info.isDel;
        this.emaildetail.isRecycle = response.info.isRecycle;  
        //补全接收人姓名
        var api4 = '/api/Users/GetStudent?authtoken='+this.authtoken +'&id='+this.emaildetail.receiver;
        this.commonService.get(api4).then((response: any) => {
          if (response.retcode == 0) {
            this.emaildetail.receiveName = response.info.realName;     
          } else {
            this.toastTip('参数错误4','danger');
            return;
          }
        });  
      } else {
        this.toastTip('参数错误3','danger');
        return;
      }
    });
    //调整时间显示格式
    this.emaildetail.sendTime = this.emaildetail.sendTime.substring(0,16);
    this.emaildetail.sendTime = this.emaildetail.sendTime.replace('T',' ');
    console.log(this.emaildetail);
  }

  //已读
  hasRead(){
    var api = '/api/Message/MessageHasReaded?authtoken='+this.authtoken +'&id='+this.email_id;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {    
        console.log("read");
      } else {
        this.toastTip('参数错误1','danger');
        return;
      }
    });
  }

  //回复该邮件
  writeback(id: any){
    this.router.navigate(['/writeback/',this.email_id]);//将邮件id传过去，那边具体信息再具体查
  }

  // 将该邮件改为重要邮件
  beImportant(ids:any){  
    console.log(ids + '标星');
    var api = '/api/Message/MessageImportant?authtoken='+this.authtoken +'&id='+ids;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        this.toastTip('该邮件成功设为重要文件','success');
        this.getEmail();
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });
  }
  //将邮件改为不重要邮件
  beNoImportant(ids:any){
    console.log(ids + '取消标星');
    var api = '/api/Message/MessageNoImportant?authtoken='+this.authtoken +'&id='+ids;
          this.commonService.get(api).then((response: any) => {
            if (response.retcode == 0) {
              this.toastTip('该邮件不再是重要文件','danger');
              this.getEmail();
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
    if(this.emaildetail.sender == this.user_id){
      console.log(ids + '确认删除');
      var api = '/api/Message/DeleteMessageHasSend?authtoken='+this.authtoken +'&id='+ids;
      this.commonService.get(api).then((response: any) => {
          if (response.retcode == 0) {
            console.log("delete success"+ids);
            this.toastTip('该邮件成功删除','success');
            this.goBack();
          } else {
            this.toastTip('参数错误','danger');
            return;
          }
      });
    }
    else if(this.emaildetail.isRecycle == true){
      var api = '/api/Message/DeleteMessagetoEnd?authtoken='+this.authtoken +'&id='+ids;
      this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
          console.log("delete success"+ids);
          this.toastTip('该邮件已彻底软删除','success');
          this.goBack();
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
      });      
    }else{
      var api = '/api/Message/DeleteMessagetoRecycle?authtoken='+this.authtoken +'&id='+ids;
      this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
          console.log("delete success"+ids);
          this.toastTip('该邮件已放入回收站','success');
          this.goBack();
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
      });
    }
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
