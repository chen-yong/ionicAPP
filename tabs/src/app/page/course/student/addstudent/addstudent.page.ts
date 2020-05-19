import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CommonService } from '../../../../services/common.service'; // 引用CommonService
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddstudentPage implements OnInit {
  public courseId;
  public studentInfo: any = {
    id: '',
    username: '',
    userNO: '',
    realName: '',
    sex: ''
  };
  public authtoken = this.storageService.get('authtoken');

  constructor(
    public location: Location,
    public router: Router,
    public toastCtrl: ToastController,
    public commonService: CommonService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    // console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(12);
  }
  goBack() {
    window.history.go(-1);
  }
  refresh() {
    this.router.navigate(['/student/' + this.courseId ]);
  }
  async toastTip(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color,
    });
    toast.present();
  }
  // 添加学生
  submitInfo() {
    if (!this.studentInfo.userName) {
      this.toastTip('请填写学号！', 'danger');
      return;
    }
    if (!this.studentInfo.realName) {
      this.toastTip('请填写姓名！', 'danger');
      return;
    }
    const api = '/api/Users/AddCourseStudent?authtoken='+this.authtoken+'&courseId='+this.courseId;
    this.commonService.post(api, this.studentInfo).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.toastTip('添加成功', 'success');
        // 刷新
        this.refresh();
      } else {
        this.toastTip('参数错误', 'danger');
        return;
      }
    });
  }

}
