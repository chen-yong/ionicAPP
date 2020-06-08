import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { asap } from 'rxjs/internal/scheduler/asap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastController } from '@ionic/angular';  // 提示弹出层

import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service'; // 引用CommonService
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public router: Router,
    public commonService: CommonService,
    public storageService: StorageService,
    public eventService: EventService,
  ) { }

  public authtoken = this.storageService.get('authtoken'); //验证令牌
    // 自定义用户数据，方便以后对接
    public userList: any = {
      id: '',
      name: '',
      img: 'assets/img/hznu.png',
      color: 'danger'
    };

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // 通过登录令牌获取登录用户个人信息
    this.getUserList();
  }

  getUserList(){
    var authtoken = this.storageService.get('authtoken');
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
        if (response.info && response.info.userName) {
          this.userList.name = response.info.userName;
          this.userList.id = response.info.id;
        } else {
          this.userList.name = '';
        }
      } else {
        this.toastTip('参数错误');
        return;
      }
    });
  }

  // 弹窗设置
  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      color: 'danger',
      cssClass: ''
    });
    toast.present();
  }

  // 点击退出按钮效果
  async logout() {
    const alert = await this.alertController.create({
      header: '温馨提示',
      message: '<Strong>您确认退出？</Strong>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: '确定',
          handler: () => {
            this.toastTip('退出成功');
            this.storageService.remove("authtoken");
          }
        }]
    });
    await alert.present();
  }

  goUserinfo(id) {
    console.log('用户ID:' + id);
    this.storageService.remove('userinfo');  //删除这个登录时候获取的个人信息缓存
    this.router.navigate(['/userinfo/', id]);
  }
}
