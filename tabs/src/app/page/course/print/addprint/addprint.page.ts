import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../../services/common.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-addprint',
  templateUrl: './addprint.page.html',
  styleUrls: ['./addprint.page.scss'],
})
export class AddprintPage implements OnInit {
  public courseId;
  public authtoken = this.storageService.get('authtoken');
  public id: any = '';
  public test : any = {
    id:'',
    name:''
  };
  public printInfo: any = {
    option2: '',
  };

  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
    public commonService: CommonService,
    public alertController: AlertController,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
    this.courseId = location.pathname.substring(10);
    this.getOptionList();
  }
  async toastTip(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color,
    });
    toast.present();
  }
  goBack() {
    window.history.go(-1);
  }

  // 添加
  submit(id) {
    if (!this.test.id) {
      this.toastTip('请选择考试！', 'danger');
      return;
    }
    console.log(this.printInfo);
    const api = 'http:/api/Users/AddCourseStudent?courseId='+this.courseId+'&authtoken='+this.authtoken+'&testId='+id;
    this.commonService.post(api, this.printInfo).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.toastTip('添加成功', 'success');
        // 返回上一层
        this.goBack();
      } else {
        this.toastTip('参数错误', 'danger');
        return;
      }
    });
  }

  // 获取下拉列表
  getOptionList() {
    const api = '/api/Course/ChooseTest?authtoken='+this.authtoken+'&courseId='+this.courseId;
    this.commonService.get(api).then((response: any) => {
      console.log(response);
      if (response.retcode === 0) {
        this.printInfo.test = response.info;
       } else {
         this.toastTip('未知错误', 'danger');
         return;
       }
    });
  }
}
