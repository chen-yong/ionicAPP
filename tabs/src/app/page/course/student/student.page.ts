import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public studentList: any[] = [
    { id: 1, name: '张三', studentNum: '0001', gender: '男', phone: '18895650001' },
    { id: 2, name: '李四', studentNum: '0002', gender: '男', phone: '18895650002' },
    { id: 3, name: '王五', studentNum: '0003', gender: '男', phone: '18895650003' },
    { id: 4, name: '赵六', studentNum: '0004', gender: '男', phone: '18895650004' },
    { id: 5, name: '陈七', studentNum: '0005', gender: '男', phone: '18895650005' }
  ];
  public courseId;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
  ) { }
  // alert提示删除学生信息
  async presentAlertConfirm(id) {
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
    console.log(location.pathname);
    this.courseId = location.pathname.substring(9);
    console.log('课程ID:' + this.courseId);
    // 根据课程ID查找所有学生列表
    // this.getStudentList();
  }
  // 返回上一层
  goBack() {
    console.log('back');
  }
  // 添加学生
  addStudent() {
    console.log('添加学生');
  }
  // 搜索学生
  getStudentList() {

  }
  // 搜索框变化事件
  // getItems($event) {
  //   console.log(this.$event);
  // }
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
  // 学生详情
  details(id) {
    console.log(id);
    this.router.navigate(['/studentinfo/', id]);
  }

}
