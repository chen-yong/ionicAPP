import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  public workList: any;
  public courseId;
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public workHistoryList: any[] = [];  // 历史记录
  public page = 1;
  public count = 100;
  public authtoken = this.storageService.get('authtoken');
  public type = 3;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public navController: NavController,
    public storageService: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController,
  ) { }
  // 长按删除作业
  async deleteWork(id) {
    const alert = await this.alertController.create({
      header: '温馨提示!',
      message: '<strong>您确认删除</strong>？',
      buttons: [
        {
          text: '不删除',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('不删除');
          }
        }, {
          text: '确认',
          handler: () => {
            console.log('删除');
            // 刷新学生列表
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    // 接收课程ID
    // console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(6);
    // 根据课程ID查找所有学生列表
    this.getWorktList();
    // 获取搜素历史
    // this.getHistory();
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
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 获取所有的作业列表
  getWorktList() {
    const api = 'http:/api/Course/HomeWorkList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&type='+this.type+'&keyword='+this.keywords+'&page='+this.page+'&count='+this.count;
    this.commonService.get(api).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.workList = response.info;
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
 
  // 批阅作业
  readWork(id) {
    console.log(id);
    this.router.navigate(['/readwork/' + id ]);
  }
  // 添加作业
  addWork(courseId) {
    console.log(courseId);
    this.router.navigate(['/addwork/' + courseId]);
  }
  // 编辑作业
  editWork(id) {
    this.router.navigate(['/editwork/' + id]);
  }
  // 获取历史记录
  // getHistory() {
  //   const workHistoryList = this.storageService.get('workHistoryList');
  //   if (workHistoryList) {
  //     this.workHistoryList = workHistoryList;
  //   }
  // }
  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.getWorktList();
  }

  // 删除作业
  async deletework(id) {
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
            return;
          }
        }, {
          text: '确定',
          handler: () => {
            const api ='http:/api/Course/DeleteWork?authtoken='+this.authtoken+'&id='+id;
            this.commonService.get(api).then((response: any) => {
              if (response.retcode === 0) {
                this.toastTip('删除成功', 'success');
                // this.getLabtList();
              }  else {
                this.toastTip('删除错误', 'danger');
                return;
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
