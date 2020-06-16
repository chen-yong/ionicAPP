import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-work-stu',
  templateUrl: './work-stu.page.html',
  styleUrls: ['./work-stu.page.scss'],
})
export class WorkStuPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController
  ) { }

  public course_id:any;

  ngOnInit() {
    console.log("传过来的值是："+location.pathname);
    this.course_id = location.pathname.substring(10);
    console.log(this.course_id);

  }
  
  
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

  // 返回上一层
  goBack() {
    window.history.go(-1);
  }

}
