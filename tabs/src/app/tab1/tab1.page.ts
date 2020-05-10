import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {StorageService} from '../services/storage.service';
import { CommonService } from '../services/common.service'; // 引用CommonService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public courseList: any[] = [
    {
      id: 1,
      name: 'Angular',
      img: '',
      color: 'danger',
      logo: 'logo-angular',
      intro: 'Angular简介……'
    },
    {
      id: 2,
      name: 'javaScript',
      img: '',
      color: 'danger',
      logo: 'logo-javascript',
      intro: 'javaScript简介……'
    }
  ];

  constructor(
    public nav: NavController,
    public router: Router,
    public storageService: StorageService,
    public commonService: CommonService,
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getCourseList();
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
      }
    });
  }
}
