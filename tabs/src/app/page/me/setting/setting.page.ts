import { Component, OnInit } from '@angular/core';
import { ToastController  } from '@ionic/angular'  // 提示弹出层
import { Router } from '@angular/router'; //路由跳转

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
    public toastCtrl: ToastController,
    public router: Router
  ) { }

  // 弹出层设置
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


  ngOnInit() {
  }

  //返回上一页设置
  goBack() {
    this.router.navigate(['/tabs/tab3/']);
  }

  //清理缓存
  clear(){
    this.toastTip('缓存清理成功!')
  }

}
