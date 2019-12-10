import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  public courseId;
  public leftList: any[] = [];
  public rightList: any[] = [];

  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
  ) {
    // 左侧模拟数据
    for (let i = 0; i < 20; i++) {
      this.leftList.push(`试卷${i}`);
    }

    // 右侧数据
  }

  ngOnInit() {
    // 接收课程ID
    console.log(location.pathname);
    this.courseId = location.pathname.substring(7);
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 重启
  reset() { }
  // 删除
  delete() { }

}
