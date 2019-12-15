import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  public workList: any[] = [
    { id: 1, name: '作业1' },
    { id: 2, name: '作业2' },
    { id: 3, name: '作业3' },
    { id: 4, name: '作业4' },
    { id: 5, name: '作业5' }
  ];

  public courseId;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public navController: NavController,
  ) { }
  // 长按删除作业
  async deleteWork(id) {
    const alert = await this.alertController.create({
      header: '温馨提示!',
      message: '<strong>您确认删除</strong>？',
      buttons: [
        {
          text: '不删除',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('不删除');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('删除');
            // 刷新学生列表
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    // 接收课程ID
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(6);
    // 根据课程ID查找所有学生列表
    // this.getWorkList();
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 获取所有的作业列表
  getWorktList() {

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
  // 批阅作业
  readWork(id) {
    console.log(id);
    this.router.navigate(['/readwork/' + id ]);
  }
  // 添加作业
  addWork(courseId) {
    console.log(courseId);
    this.router.navigate(['/addwork/' + courseId]);
  }
  // 编辑作业
  editWork(id) {
    this.router.navigate(['/editwork/' + id]);
  }
  goSearch() {
    this.navController.navigateForward('/search');
  }
}
