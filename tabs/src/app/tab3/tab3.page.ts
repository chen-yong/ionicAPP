import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { asap } from 'rxjs/internal/scheduler/asap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ToastController } from '@ionic/angular';  // 提示弹出层

import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
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
    public storageService: StorageService,
    public eventService: EventService,
  ) { }

  // 自定义用户数据，方便以后对接
  public userList: any = {
    id: 1,
    name: 'Admin',
    img: 'assets/img/hznu.png',
    color: 'danger',
    intro: '扬帆起航，就此远航'
  };

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    // 通过登录获取登录用户信息
    this.eventService.event.on('useraction', () => {
      const userinfo = this.storageService.get('userinfo');
      if (userinfo && userinfo.name) {
        this.userList.name = userinfo.name;
      } else {
        this.userList.name = '';
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
            this.toastTip('该功能还在开发中');
          }
        }]
    });
    await alert.present();
  }

  goUserinfo(id) {
    console.log('用户ID:' + id);
    this.router.navigate(['/userinfo/', id]);
  }
}
