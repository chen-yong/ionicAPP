import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CommonService } from '../../../../services/common.service'; // 引用CommonService
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.page.html',
  styleUrls: ['./editstudent.page.scss'],
})
export class EditstudentPage implements OnInit {
  public userId;
  public authtoken = this.storageService.get('authtoken');
  public studentInfo: any = {
    id: '',
    username: '',
    userNO: '',
    realName: '',
    sex: ''
  };

  constructor(
    public location: Location,
    public router: Router,
    public toastCtrl: ToastController,
    public commonService: CommonService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    this.userId = location.pathname.substring(13);
    this.getStudentInfo();
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
  // 保存学生（有bug）
  submitInfo(id) {
    if (!this.studentInfo.userName) {
      this.toastTip('请填写学号！', 'danger');
      return;
    }
    if (!this.studentInfo.realName) {
      this.toastTip('请填写姓名！', 'danger');
      return;
    }
    console.log(this.studentInfo);
    const api = 'http:/api/Users/EditUser?authtoken='+this.authtoken+'&id='+id;
    this.commonService.post(api, this.studentInfo).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.toastTip('保存成功', 'success');
        // 关闭
        this.doClose();
      } else {
        this.toastTip('保存失败', 'danger');
        return;
      }
    });
  }
  // 关闭
  doClose() {
    window.history.go(-1);
  }
  // 获取学生信息
  getStudentInfo() {
    const api = 'http:/api/Users/GetStudent?authtoken='+this.authtoken+'&id='+this.userId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
        this.studentInfo = response.info;
      } else {
        this.toastTip('参数错误', 'danger');
        return;
      }
    });
  }

}
