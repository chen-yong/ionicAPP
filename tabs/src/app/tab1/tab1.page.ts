import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {StorageService} from '../services/storage.service';
import { CommonService } from '../services/common.service'; // 引用CommonService
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public courseList: any;

  constructor(
    public nav: NavController,
    public router: Router,
    public storageService: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController,
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getCourseList();
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
  // 进入课程管理页面
  goCourse(id) {
    console.log('课程ID:' + id);
    this.router.navigate(['/manage/', id]);
  }
  // 搜索框改变事件
  getItems() { }
  // 输入框清除事件
  cancel() { }
  // 获取课程列表
  getCourseList() {
    var authtoken = this.storageService.get('authtoken');
    var api = 'http:/api/Course/GetCoursesList?authtoken='+authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response);
      if (response.retcode == 0) {
        this.courseList = response.info;
      } else {
        this.toastTip('参数错误');
        return;
      }
    });
  }
}
