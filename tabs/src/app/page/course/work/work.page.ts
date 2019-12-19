import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  public workList: any[] = [
    { id: 1, name: '作业1' },
    { id: 2, name: '作业2' },
    { id: 3, name: '作业3' },
    { id: 4, name: '作业4' },
    { id: 5, name: '作业5' }
  ];

  public courseId;
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public workHistoryList: any[] = [];  // 历史记录

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public navController: NavController,
    public storage: StorageService,
    public commonService: CommonService,
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
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(6);
    // 根据课程ID查找所有学生列表
    // this.getWorkList();
    // 获取搜素历史
    this.getHistory();
  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
    // 获取搜素历史
    this.getHistory();
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 获取所有的作业列表
  getWorktList() {

  }
  // 搜索框变化事件
  // getItems($event) {
  //   console.log($event);
  // }
  // 获得焦点
  focusInput() {
    this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // console.log('失去焦点');
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
  getHistory() {
    const workHistoryList = this.storage.get('workHistoryList');
    if (workHistoryList) {
      this.workHistoryList = workHistoryList;
    }
  }
  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.saveHistory();  // 保存搜索关键词
    this.flag = false;
  }

  // 保存历史记录
  saveHistory() {
    this.commonService.saveLocalStorage('workHistoryList', this.keywords);
  }
  // 删除历史记录
  async removeHistory(key) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示！',
      message: '要删除此条记录吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Cancel');
          }
        }, {
          text: '删除',
          handler: () => {
            this.workHistoryList.splice(key, 1);
            this.storage.set('workHistoryList', this.workHistoryList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(workHistoryList) {
    this.workHistoryList.splice(workHistoryList, workHistoryList.length);
    this.storage.set('workHistoryList', this.workHistoryList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }
}
