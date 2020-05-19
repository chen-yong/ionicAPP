import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  public ExerciseList: any;
  public courseId;
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public exeHistoryList: any[] = [];  // 历史记录
  public page = 1;
  public count = 100;
  public authtoken = this.storage.get('authtoken');
  public type = 2;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    // 接收课程ID
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(10);
    this.getExerciseList();
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
  // 获取所有的练习列表
  getExerciseList() {
    const api = '/api/Course/HomeWorkList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&type='+this.type+'&keyword='+this.keywords+'&page='+this.page+'&count='+this.count;
    this.commonService.get(api).then((response: any) => {
      console.log(response);
      if (response.retcode === 0) {
        this.ExerciseList = response.info;
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
  // 批阅练习
  readExercise(id) {
    console.log(id);
    this.router.navigate(['/readexercise/' + id ]);
  }
  // 添加练习
  addExercise(courseId) {
    console.log(courseId);
    this.router.navigate(['/addexercise/' + courseId]);
  }
  // 编辑练习
  editExercise(id) {
    this.router.navigate(['/editexercise/' + id]);
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.getExerciseList();
  }

  // 删除作业
  async deleteExercise(id) {
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
            const api ='/api/Course/DeleteWork?authtoken='+this.authtoken+'&id='+id;
            this.commonService.get(api).then((response: any) => {
              if (response.retcode === 0) {
                this.toastTip('删除成功', 'success');
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
