import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  public courseId;
  public taskId;
  public keywords: any = '';
  public leftList: any = '';
  public taskData: any = '';
  public selectedId: any = '';  /*选中的试卷id*/
  public authtoken = this.storage.get('authtoken');

  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
    public commonService: CommonService,
    public alertController: AlertController,
    public storage: StorageService,
  ) {}

  ngOnInit() {
    // 课程ID
    this.courseId = location.pathname.substring(7);
    this.getPaperTaskList();
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
  // 返回上一层
  goBack() {
    window.history.go(-1);
  }

  // 获取右侧试卷详细数据
  getRightData(id) {
    this.selectedId = id;
    this.getTaskInfo(id);
  }
  // 重启
  async reset() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要重启吗!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消重启');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('确认重启');
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除
  async delete(id) {
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
            console.log('确认删除');
            this.deleteTask(id);
          }
        }
      ]
    });
    await alert.present();
  }
  // 添加打印任务
  addPtint(courseId) {
    this.router.navigate(['/addprint/' + courseId]);
  }

   // 获取打印任务列表
   getPaperTaskList() {
    const api = '/api/Course/PaperTaskList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&keyword='+this.keywords;
    this.commonService.get(api).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.leftList = response.info;
         // 第一个id
        if (response.info.length > 0) {
          this.taskId = response.info[0].id;
          this.selectedId = this.taskId;
          this.getTaskInfo(this.taskId);
        }
       } else {
         this.toastTip('未知错误', 'danger');
         return;
       }
    });
  }

  // 获取单个打印任务详情
  getTaskInfo(id) {
    const api= '/api/Course/PaperTask?authtoken='+this.authtoken+'&id='+id;
    this.commonService.get(api).then((response: any) => {
     // console.log(response);
      if (response.retcode === 0) {
        this.taskData = response.info;
       } else {
         this.toastTip('未知错误', 'danger');
         return;
       }
    });
  }

  // 删除
  deleteTask(id){
    const api= '/api/Course/DeletePaperTask?authtoken='+this.authtoken+'&id='+id;
    this.commonService.get(api).then((response: any) => {
      // console.log(response);
       if (response.retcode === 0) {
         this.toastTip('删除成功', 'success');
         // 刷新
         this.getPaperTaskList();
        } else {
          this.toastTip('未知错误', 'danger');
          return;
        }
     });
  }

}
