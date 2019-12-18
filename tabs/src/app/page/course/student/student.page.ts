import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StudentinfoComponent } from './components/studentinfo/studentinfo.component';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any[] = [];  // 历史记录
  public studentList: any[] = [
    { id: 1, name: '张三', studentNum: '0001', gender: '男', phone: '18895650001' },
    { id: 2, name: '李四', studentNum: '0002', gender: '男', phone: '18895650002' },
    { id: 3, name: '王五', studentNum: '0003', gender: '男', phone: '18895650003' },
    { id: 4, name: '赵六', studentNum: '0004', gender: '男', phone: '18895650004' },
    { id: 5, name: '陈七', studentNum: '0005', gender: '男', phone: '18895650005' }
  ];
  public courseId;

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public storage: StorageService,
  ) { }

  ngOnInit() {
    // 接收课程ID
    console.log(location.pathname);
    this.courseId = location.pathname.substring(9);
    // console.log('课程ID:' + this.courseId);
    // 根据课程ID查找所有学生列表
    // this.getStudentList();
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
  // 添加学生
  addStudent(courseId) {
    // console.log('添加学生');
    this.router.navigate(['/addstudent/' + courseId]);
  }
  // 搜索学生
  getStudentList() {
    this.getHistory();
  }
  // 获得焦点
  focusInput() {
    this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // this.flag = !this.flag;
  }
  // 长按触发删除学生事件
  async delete(id: string) {
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
            console.log(id + '确认删除');
          }
        }
      ]
    });
    await alert.present();
  }
  // 点击事件model框显示学生信息
  async showModel(id: string) {
    const modal = await this.modalController.create({
      component: StudentinfoComponent,
      componentProps: { value: id } // 传值
    });
    return await modal.present();
  }
  // 重置密码
  async resetPwd(id: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要重置密码？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log(id + '确认');
          }
        }
      ]
    });
    await alert.present();
  }
  // 获取历史记录
  getHistory() {
    const historyList = this.storage.get('historylist');
    if (historyList) {
      this.historyList = historyList;
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
    let historyList = this.storage.get('historylist');
    if (historyList) { // 存在历史记录
      if (historyList.indexOf(this.keywords.trim()) === -1) {
        if (this.keywords.trim().length > 0) {
          historyList.push(this.keywords.trim());
        }
      }
      this.storage.set('historylist', historyList);
    } else {  // 不存在
      if (this.keywords.trim().length > 0) {
        historyList = [];
        historyList.push(this.keywords.trim());
        this.storage.set('historylist', historyList);
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
            this.historyList.splice(key, 1);
            this.storage.set('historylist', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(historyList) {
    this.historyList.splice(historyList, historyList.length);
    this.storage.set('historylist', this.historyList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }

}
