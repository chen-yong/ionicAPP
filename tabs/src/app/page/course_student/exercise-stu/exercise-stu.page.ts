import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-exercise-stu',
  templateUrl: './exercise-stu.page.html',
  styleUrls: ['./exercise-stu.page.scss'],
})
export class ExerciseStuPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController
  ) { }

  public course_id:any;
  public workList:any[]=[];

  ngOnInit() {
    console.log("传过来的值是："+location.pathname);
    this.course_id = location.pathname.substring(14);
    console.log(this.course_id);
    
    this.getWorktList();
  }

  // 获取所有的作业列表
  getWorktList() {
    // const api = '/api/Course/HomeWorkList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&type='+this.type+'&keyword='+this.keywords+'&page='+this.page+'&count='+this.count;
    let api="http://www.zjcai.com/api/testinfo?testid=2964&authtoken=FDF3F65873C1E0AE8EABB6CBCC7790C088E8FFE1A6A8C093B929C7306D9778C0'";
    this.commonService.get(api).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.workList = response.items;
        console.log(this.workList);
      } else if (response.retcode === 11) {
        this.toastTip('参数错误', 'danger');
        return;
      } else if (response.retcode === 13) {
        this.toastTip('令牌authtoken失效', 'danger');
        return;
      } else {
        this.toastTip('未知错误', 'danger');
        return;
      }
    });
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

  // 返回上一层
  goBack() {
    window.history.go(-1);
  }

}
