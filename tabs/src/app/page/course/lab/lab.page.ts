import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
})
export class LabPage implements OnInit {
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public labHistoryList: any[] = [];  // 历史记录
  public LabList: any[] = [
    { id: 1, name: '实验1' },
    { id: 2, name: '实验2' },
    { id: 3, name: '实验3' },
    { id: 4, name: '实验4' },
    { id: 5, name: '实验5' }
  ];

  public courseId;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
  ) { }
  // 长按删除实验
  async deleteLab(id) {
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
    this.courseId = location.pathname.substring(5);
    // 根据课程ID查找所有学生列表
    // this.getLabList();
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
  // 获取所有的实验列表
  getLabtList() {

  }
  // 搜索框变化事件
  getItems($event) {
    console.log($event);
  }
  // 获得焦点
  focusInput() {
    this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // console.log('失去焦点');
  }
  // 批阅实验
  readLab(id) {
    console.log(id);
    this.router.navigate(['/readlab/' + id ]);
  }
  // 添加实验
  addLab(courseId) {
    console.log(courseId);
    this.router.navigate(['/addlab/' + courseId]);
  }
  // 编辑实验
  editLab(id) {
    this.router.navigate(['/editlab/' + id]);
  }
   // 获取历史记录
   getHistory() {
    const labHistoryList = this.storage.get('labHistoryList');
    if (labHistoryList) {
      this.labHistoryList = labHistoryList;
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
    /*
    1、获取本地存储里面的历史记录数据
    2、判断本地存储的历史记录是否存在
    3、存在：把新的历史记录和以前的历史记录拼接 ,然后重新保存 （去重）
    4、不存在：直接把新的历史记录保存到本地
    */
    let labHistoryList = this.storage.get('labHistoryList');
    if (labHistoryList) { // 存在历史记录
      if (labHistoryList.indexOf(this.keywords.trim()) === -1) {
        if (this.keywords.trim().length > 0) {
          labHistoryList.push(this.keywords.trim());
        }
      }
      this.storage.set('labHistoryList', labHistoryList);
    } else {  // 不存在
      if (this.keywords.trim().length > 0) {
        labHistoryList = [];
        labHistoryList.push(this.keywords.trim());
        this.storage.set('labHistoryList', labHistoryList);
      }
    }
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
            this.labHistoryList.splice(key, 1);
            this.storage.set('labHistoryList', this.labHistoryList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(labHistoryList) {
    this.labHistoryList.splice(labHistoryList, labHistoryList.length);
    this.storage.set('labHistoryList', this.labHistoryList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }

}
