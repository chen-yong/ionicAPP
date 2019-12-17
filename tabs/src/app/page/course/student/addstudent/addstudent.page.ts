import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddstudentPage implements OnInit {
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
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(12);
  }
  goBack(courseId) {
    this.router.navigate(['/student/' + courseId]);
  }
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
  submit() {
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

}
