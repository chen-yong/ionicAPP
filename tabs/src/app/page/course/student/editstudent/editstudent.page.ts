import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.page.html',
  styleUrls: ['./editstudent.page.scss'],
})
export class EditstudentPage implements OnInit {
  public courseId;
  public student: any = {
    number: '',
    name: '',
    college: '',
    class: '',
    genderList: [{ id: 0, value: '男' }, { id: 1, value: '女' }],
    gender: '',
    phone: '',
  };

  constructor(
    public location: Location,
    public router: Router,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.substring(12);
  }
  // 保存信息
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
  // 添加学生
  submitInfo() {
    if (!this.student.number) {
      this.toastTip('请填写学号！');
      return;
    }
    if (!this.student.name) {
      this.toastTip('请填写姓名！');
      return;
    }
    console.log(this.student);
  }
  // 关闭
  doClose(id) {
    this.router.navigate(['/student/' + id]);
  }

}
