import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  public ExerciseList: any[] = [
    { id: 1, name: '练习1' },
    { id: 2, name: '练习2' },
    { id: 3, name: '练习3' },
    { id: 4, name: '练习4' },
    { id: 5, name: '练习5' }
  ];

  public courseId;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
  ) { }
  // 长按删除练习
  async deleteExercise(id) {
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
    this.courseId = location.pathname.substring(10);
    // 根据课程ID查找所有学生列表
    // this.getLabList();
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 获取所有的练习列表
  getLabtList() {

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
  // 批阅练习
  readExercise(id) {
    console.log(id);
    this.router.navigate(['/readexercise/' + id ]);
  }
  // 添加练习
  addExercise(courseId) {
    console.log(courseId);
    this.router.navigate(['/addexercise/' + courseId]);
  }
  // 编辑练习
  editExercise(id) {
    this.router.navigate(['/editexercise/' + id]);
  }

}
