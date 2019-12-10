import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service'; // 引用CommonService
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo: any = {
    username: '',
    password: ''
  };
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public nav: NavController,
    public httpService: CommonService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color: 'danger',
    });
    toast.present();
  }
  login() {
    if (!this.userinfo.username) {
      this.toastTip('请填写账号！');
      return;
    }
    if (!this.userinfo.password) {
      this.toastTip('请填写密码！');
      return;
    }
    console.log(this.userinfo);
    if (this.userinfo.username === '1' && this.userinfo.password === '1') {
      this.nav.navigateRoot('/tabs/tab1');
    } else {
       // 登录API
    const api = '';
    this.httpService.get(api).then((Response) => {
      console.log(Response);
    });
      // this.toastTip('账号或密码不正确！');
    }
  }
}
