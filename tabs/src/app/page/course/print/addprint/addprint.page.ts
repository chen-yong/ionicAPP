import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addprint',
  templateUrl: './addprint.page.html',
  styleUrls: ['./addprint.page.scss'],
})
export class AddprintPage implements OnInit {
  public id: any = '';
  public print: any = {
    testList: [{ id: 1, value: '试卷1' }, { id: 2, value: '试卷2' }],
    test: '',
    name: '',
    title: '',
    subhead: '',
  };

  constructor(
    public location: Location,
    public router: Router,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.id = location.pathname.substring(9);
  }
  goBack(id) {
    this.router.navigate(['/print/' + id]);
  }
  // 获取考试列表
  getTestList() { }

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
    if (!this.print.test) {
      this.toastTip('请选择考试！');
      return;
    }
    console.log(this.print);
  }

}
