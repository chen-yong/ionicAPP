import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';   //路由插件
import { Location } from '@angular/common'; //接受理由传值

import { ModalController } from '@ionic/angular';//控制组件的弹出
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';//导入写邮件组件
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-writeback',
  templateUrl: './writeback.page.html',
  styleUrls: ['./writeback.page.scss'],
})
export class WritebackPage implements OnInit {

  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    public location: Location,
    public commonService: CommonService,
    public storageService: StorageService,
    public alertController: AlertController,
    public modalController: ModalController
  ) { }

  public emailneedback_id; //需要回的信的id，前面传过来的
   //邮件内容
  public emailDetail:any={
    sender:1,
    subject:'',
    body:'',
    isImportant:false
  }

  public receive_realName = '';//收件人的真实姓名
  public receive_id; //收件人的id
  public sender_id; //用户id,也就是发件人id
  public email_id; //用于临时存储刚刚发送的那份信件的id。
  public authtoken = this.storageService.get('authtoken');  //登录令牌
  public oldCode = '';
  public code = '';

  ngOnInit() {
    this.emailneedback_id=location.pathname.substring(11); 
    console.log("需要回信的id "+this.emailneedback_id);
    this.getsenderList();
    this.getYuanEmail();
  }

  getYuanEmail(){
    var api = '/api/Message/GetMessageById?authtoken='+this.authtoken+'&id='+this.emailneedback_id;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
        this.oldCode = response.info.code;
        this.receive_id = response.info.sender;
        console.log("code"+this.oldCode);

        this.emailDetail.subject = "回复: "+ response.info.subject ;
        console.log(this.emailDetail.subject);

        var api2 = '/api/Users/GetStudent?authtoken='+this.authtoken+'&id='+response.info.sender;
        this.commonService.get(api2).then((response2: any) => {
          if (response2.retcode === 0) {
            this.receive_realName = response2.info.realName;
          } else if (response2.retcode === 11) {
            this.toastTip('参数错误', 'danger');
            return;
          } else if (response2.retcode === 13) {
            this.toastTip('令牌authtoken失效', 'danger');
            return;
          } else {
            this.toastTip('未知错误', 'danger');
            return;
          }
        });
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });

  }

  getsenderList(){
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+this.authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
        this.sender_id = response.info.id;
        this.emailDetail.sender = this.sender_id;
        console.log("用户ID:"+this.emailDetail.sender);
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });
  }

  //弹窗组件关闭功能设置
  doClose() {
    this.router.navigate(['/tabs/tab2']);
    //this.navParams.data.modal.dismiss();//关闭这个弹出的组件
  }

  //邮件发送功能设置
  submit(){
      console.log(this.emailDetail);
      var api = '/api/Message/AddMessage?authtoken='+this.authtoken;
      this.commonService.post(api, this.emailDetail).then((response: any) => {
        // console.log(response);
        if (response.retcode == 0) {
            this.email_id = response.info.id;  //信件的信id读取,这是新建的这份信的id
            var api2 = '/api/Message/NewCodeAndAddPeMessageReceive?authtoken='
                          +this.authtoken+'&id='+this.email_id+'&userid='+this.receive_id;
            this.commonService.get(api2).then((response2: any) => {
              if (response2.retcode == 0) {
                 console.log("成功给id："+this.receive_id+"的用户回复邮件");
                 //修改email_id的信件的code为原先的加上这个
                 this.code = this.oldCode +'/'+this.email_id;
                 console.log(this.code);
                 var api3 = '/api/Message/ChangeCode?authtoken='+this.authtoken+"&id="+this.email_id+'&code='+this.code;
                 this.commonService.get(api3).then((response: any) => {
                   console.log(response.info);
                   if (response.retcode == 0) {
                     console.log("用户ID:"+this.email_id+"的code变成"+this.code);
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
        } else {
          this.toastTip('保存失败', 'danger');
          return;
        }
      });
      this.toastTip("您的邮件已经成功回复","success");
      this.doClose();
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

  //标为重要文件
  beImportant(){
    this.emailDetail.isImportant = true;
    console.log(this.emailDetail.isImportant);
  }

  //标为不重要文件
  beNoImportant(){
    this.emailDetail.isImportant = false;
    console.log(this.emailDetail.isImportant);
  }

}
