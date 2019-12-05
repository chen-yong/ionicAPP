import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
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
