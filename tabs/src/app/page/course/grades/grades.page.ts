import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';
import 'hammerjs';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public gradesHistoryList: any[] = [];  // 历史记录
  public leftList: any[] = [];
  public rightList: any={
    "courseId": "",
    "userId": "",
    "zycj": "",
    "sycj": "",
    "kscj1": "",
    "kscj2": "",
    "kscj3": "",
    "kscj4": "",
    "kscj5": "",
    "cj": "",
    "course": "",
    "finalGrade": "",
    "level": ""
};
  public selectedId: any = '';  /*选中的学生id*/
  public LeftStyle: any = 'leftList1';
  public courseId: any = '';
  public page = 1;
  public count = 10;
  public authtoken = this.storage.get('authtoken');
  public type = 3;
  public userId: any = '';
  public hasmore = true;


  constructor(
    public location: Location,
    public router: Router,
    public commonService: CommonService,
    public alertController: AlertController,
    public storage: StorageService,
    public toastCtrl: ToastController,
  ) {}

  ngOnInit() {
     // 接收课程ID
     this.courseId = location.pathname.substring(8);
     this.loadMore(null);
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

  goBack() {
    window.history.go(-1);
  }

  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.loadMore(null);
  }

  // 左滑
  leftSlide() {
    this.LeftStyle = 'leftList';
  }
  // 右滑
  rightSlide() {
    this.LeftStyle = 'leftList1';
  }

  // 下拉分页加载更多
  loadMore(e) {
    const api = '/api/Users/StudentList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&keyword='+this.keywords+'&page='+this.page+'&count='+this.count;
    this.commonService.get(api).then((response: any) => {
      console.log(response);
      if (response.retcode === 0) {
         // 第一个学生id
         if (response.info.length > 0) {
          this.userId = response.info[0].id;
          this.selectedId = this.userId;
          console.log(this.userId);
          this.getScoreInfo(this.userId);
        }
        // 拼接分页内容
        // tslint:disable-next-line: align
        this.leftList = this.leftList.concat(response.info);
         ++this.page;
         console.log(response.hasnext);
         console.log(this.page);
        // 判断是否还有下一页
         if(!response.hasnext) {
          e?e.target.disabled=true:'';
          this.hasmore = false;
        }
        // 请求完成数据以后告诉ion-infinite-scroll更新数据
         e?e.target.complete():'';
       } else {
         this.toastTip('未知错误', 'danger');
         return;
       }
    });
  }
  getScoreInfo(userId) {
    this.selectedId = userId;
    const api = '/api/Course/StudentGrade?authtoken='+this.authtoken+'&courseId='+this.courseId+'&id='+userId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
        // console.log(response);
        this.rightList = response.info;
        console.log(this.rightList);
      } else {
        this.toastTip('未知错误', 'danger');
        return;
      }
    });
  }

  getLeftData(id) {
    this.getScoreInfo(id);
  }

  // 设置成绩比例
  // async gradeSet(id) {
  //   const alert = await this.alertController.create({
  //     header: '成绩比列设定!',
  //     inputs: [
  //       {
  //         name: 'name1',
  //         type: 'number',
  //         min: 0,
  //         max: 100,
  //         placeholder: '作业比例'
  //       },
  //       {
  //         name: 'name6',
  //         type: 'number',
  //         min: 0,
  //         max: 100,
  //         placeholder: '实验比例'
  //       },
  //       {
  //         name: 'name6',
  //         type: 'number',
  //         min: 0,
  //         max: 100,
  //         placeholder: '文秘类技能操作考试比例'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: '取消',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: '确定',
  //         handler: () => {
  //           console.log('Confirm Ok');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
}
