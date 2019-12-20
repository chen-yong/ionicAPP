import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // 提示弹出层
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service'; // 引用CommonService
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service'; // 引用EventService
import { StorageService } from '../services/storage.service';

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
    public commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    public eventService: EventService,
    public storageService: StorageService,
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
      // 保存用户信息
      this.storageService.set('userinfo', this.userinfo);
      // 更新用户信息
      this.eventService.event.emit('useraction');
      // 跳转到首页
      this.nav.navigateRoot('/tabs/tab1');
    } else {
      // 登录API
      const api = '';
      this.commonService.post(api, {
        username: this.userinfo.username,
        password: this.userinfo.password,
      }).then((response: any) => {
        // console.log(response);
        if (response.success) {
          // 保存用户信息
          this.commonService.saveLocalStorage('userinfo', this.userinfo[0]);
          this.commonService.saveLocalStorage('userinfo', this.userinfo[1]);
          // this.storageService.set('userinfo', this.userinfo);
          // 更新用户信息
          this.eventService.event.emit('useraction');
          // 跳转到首页
          this.nav.navigateRoot('/tabs/tab1');
        } else {
          this.toastTip('账号或密码不正确！');
        }
      });
    }
  }
}
