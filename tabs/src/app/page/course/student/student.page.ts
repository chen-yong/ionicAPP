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

  ngOnInit() {
    // 接收课程ID
    console.log(location.pathname);
    this.courseId = location.pathname.substring(9);
    // console.log('课程ID:' + this.courseId);
    // 根据课程ID查找所有学生列表
    // this.getStudentList();
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 添加学生
  addStudent(courseId) {
    // console.log('添加学生');
    this.router.navigate(['/addstudent/' + courseId]);
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
  // 长按触发删除学生事件
  async delete(id: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要删除吗!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消删除');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log(id + '确认删除');
          }
        }
      ]
    });
    await alert.present();
  }
  // 点击事件
  doTap(id: string) {
    console.log(id + '点击触发事件');
    // this.router.navigate(['/studentinfo/', id]);
  }
  // 重置密码
  async resetPwd(id: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要重置密码？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log(id + '确认');
          }
        }
      ]
    });
    await alert.present();
  }

}
