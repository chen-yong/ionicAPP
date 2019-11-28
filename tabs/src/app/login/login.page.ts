import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service'; // 引用CommonService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  showPwd: boolean;
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public nav: NavController,
    public httpService: CommonService,
  ) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.showPwd = false;
  }
  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: ''
    });
    toast.present();
  }
  login() {
    if (!this.username) {
      this.toastTip('请填写用户名！');
      return;
    }
    if (!this.password) {
      this.toastTip('请填写密码！');
      return;
    }
    const info = this.username + this.password;
    console.log(info);
    if (this.username === '1' && this.password === '1') {
      this.router.navigate(['/tabs']);
    } else {
      this.toastTip('账号或密码不正确！');
      return;
    }
     // 登录API
    const api = '';
    this.httpService.get(api).then((Response) => {
       console.log(Response);
    });
  }
}
