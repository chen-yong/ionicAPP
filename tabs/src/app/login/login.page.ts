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
  public username: '';
  public password: '';
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
    if (!this.username) {
      this.toastTip('请填写账号！');
      return;
    }
    if (!this.password) {
      this.toastTip('请填写密码！');
      return;
    }
      // 登录API
      var api = 'http:/api/Launch/Login?username='+this.username+'&password='+this.password+'';
      this.commonService.get(api).then((response: any) => {
        //console.log(response);
        if (response.retcode==0) {
          console.log(response.message);
          // 保存用户信息
          this.commonService.saveLocalStorage('authtoken',response.authtoken);
          // 跳转到首页
          this.nav.navigateRoot('/tabs/tab1');
        } else {
          this.toastTip('账号或密码不正确！');
        }
      });
  } 
}
