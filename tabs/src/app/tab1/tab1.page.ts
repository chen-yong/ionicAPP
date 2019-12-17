import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


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
  ) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() { }
  // 进入课程管理页面
  goCourse(id) {
    console.log('课程ID:' + id);
    this.router.navigate(['/manage/', id]);
  }
  // 搜索框改变事件
  getItems() { }
  // 输入框清除事件
  cancel() { }
}
