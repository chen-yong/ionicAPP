import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public userid:any;  //用户id
  public userPassword:any="123abc";  //真正的密码
  public oldPassword:any;   //输入的旧密码
  public newPassword1:any;  
  public newPassword2:any;

  public pwshow:any=false;
  public pwshow2:any=false;
  public pwshow3:any=false;

  constructor(
    public lacation:Location,
    public toastCtrl: ToastController,
    public router:Router
  ) { 
  }

  // 弹出层设置
  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: ''
    });
    toast.present();
  }

  ngOnInit() {
      // 接收课程ID
      console.log(location.pathname);
      this.userid = location.pathname.substring(9);
      console.log('用户ID:' + this.userid);
      // 根据用户ID查找用户密码
      // this.getPassword();
  }

  // //根据用户id获取用户密码
  // getPassword(id){
     
  // }
  //返回之前页面
  goBack() {
    this.router.navigate(['/tabs/tab3/']);
  }

  confirm(){
    if(this.oldPassword != this.userPassword){
      this.toastTip('原密码输入错误！');
      console.log(this.newPassword1)
    }
    else if(this.newPassword1!=this.newPassword2){
      this.toastTip('密码修改失败!两次新密码不一致')
    }else{
      this.toastTip("密码修改成功!")
      /* 将新密码存入到数据库中，修改成功*/
      this.router.navigate(['/userinfo/',this.userid]);
    }

  }
}
