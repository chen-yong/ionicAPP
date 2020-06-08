import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public userid:any;  //用户id
  public userPassword:any="admin123";  //名义上的真正的密码
  public oldPassword:any;   //输入的旧密码
  public newPassword1:any;  
  public newPassword2:any;
  public submitPassword:any={
      password:'' //存放上传数据库的密码
  };

  public pwshow:any=false;
  public pwshow2:any=false;
  public pwshow3:any=false;

  constructor(
    public lacation:Location,
    public toastCtrl: ToastController,
    public commonService: CommonService,
    public storageService: StorageService,
    public router:Router
  ) { 
  }

  // 弹出层设置
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

  ngOnInit() {
      // 接收课程ID
      console.log(location.pathname);
      this.userid = location.pathname.substring(9).slice(1);

      console.log('用户ID:' + this.userid);
      // 根据用户ID查找用户密码
      // this.getPassword();
  }

  //根据用户id获取用户密码(密码解密)【这个功能尚未开发】
  // getPassword(id){
     
  // }
  //返回之前页面
  goBack() {
    this.router.navigate(['/tabs/tab3/']);
  }

  confirm(){
    if(this.oldPassword != this.userPassword){
      this.toastTip('原密码输入错误！','danger');
      console.log(this.newPassword1)
    }else if(this.newPassword1.length<6){
      this.toastTip('新密码必须要在六位数以上','danger');
    }
    else if(this.newPassword1!=this.newPassword2){
      this.toastTip('密码修改失败!两次新密码不一致','danger')
    }else{
      this.submitPassword.password = this.newPassword1;
      /* 将新密码存入到数据库中，修改成功*/
      var authtoken = this.storageService.get('authtoken');
      var api = '/api/Users/EditPwd?authtoken='+authtoken+'&id='+this.userid;
      this.commonService.post(api, this.submitPassword).then((response: any) => {
        // console.log(response);
        if (response.retcode === 0) {
          this.toastTip("密码修改成功!",'success')
          console.log(this.newPassword1);
        } else {
          this.toastTip('密码修改失败', 'danger');
          return;
        }
      });

      this.router.navigate(['/userinfo/',this.userid]);
    }

  }

}
