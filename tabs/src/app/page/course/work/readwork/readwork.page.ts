import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-readwork',
  templateUrl: './readwork.page.html',
  styleUrls: ['./readwork.page.scss'],
})
export class ReadworkPage implements OnInit {
  public courseId;
  public headline = '作业批阅';
  public option = 'false';
  public list: any = [
    // tslint:disable-next-line:max-line-length
    { id: 1, name: '张三', number: '001', checked: 'false', time: '2018-11-28 15:11', sum: '3', identifying: '已交卷', grossscore: '100', score: '10', state: '已交卷' },
    // tslint:disable-next-line:max-line-length
    { id: 2, name: '李四', number: '002', checked: 'false', time: '2018-11-28 15:11', sum: '3', identifying: '已交卷', grossscore: '100', score: '10', state: '已交卷' },
  ];

  public isCheckedAll = false;

  constructor(
    public router: Router,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(10);
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/work/' + courseId]);
  }
  // 单选
  checkboxChange(id) {
    console.log(id);
  }
  // 全选
  checkAll() {
    if (this.isCheckedAll) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked = false;
      }
      this.isCheckedAll = false;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.list.length; i++) {

        this.list[i].checked = true;
      }
      this.isCheckedAll = true;
    }
  }
  // 阅卷
  readWork() {
    console.log(this.list);
    this.presentLoading();
  }
  // Loading
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '阅卷中，请等待…', // 提示文字
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      // spinner: null,
      duration: 5000, // 延时时间
      message: 'Please wait...',
      translucent: true, // 半透明
      cssClass: 'custom-class custom-loading' // css样式要写在全局
    });
    return await loading.present();
  }
}

