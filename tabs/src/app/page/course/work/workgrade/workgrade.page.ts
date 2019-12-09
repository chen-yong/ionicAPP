import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workgrade',
  templateUrl: './workgrade.page.html',
  styleUrls: ['./workgrade.page.scss'],
})
export class WorkgradePage implements OnInit {
  grandeList: any[] = [
    { id: 1, name: '张三', grade: '100', },
    { id: 2, name: '李四', grade: '100', },
    { id: 3, name: '王五', grade: '100', },
    { id: 4, name: '赵六', grade: '100', },
    { id: 5, name: '陈七', grade: '100', }
  ];
  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/manage/1']);
  }
  doChange() {
    console.log('1111');
  }
  // 搜索框变化事件
  getItems($event) {
    console.log($event);
  }
  // 获得焦点
  focusInput() {
    console.log('获得焦点');
  }
  // 失去焦点
  blurInput() {
    console.log('失去焦点');
  }
  // 点击取消
  cancel() {
    console.log('点击取消');
  }

}
