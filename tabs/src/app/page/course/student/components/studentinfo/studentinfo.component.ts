import { Component, OnInit } from '@angular/core';
// 接收传值
import { ModalController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.component.html',
  styleUrls: ['./studentinfo.component.scss'],
})
export class StudentinfoComponent implements OnInit {
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
    public modalController: ModalController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    ) {
    console.log(this.navParams);
    // 获取学生传递的Id
    // console.log(this.navParams.data.value);
  }

  ngOnInit() { }
  // 关闭模态对话框
  doClose() {
    this.navParams.data.modal.dismiss();
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
}
