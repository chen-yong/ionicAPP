import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public navController: NavController,
    public location: Location,
    public alertController: AlertController,
    public storage: StorageService
  ) { }

  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any[] = [];  // 历史记录
  public emailList: any[] = [
    { id: 1, sender_name: '张三', theme: '打印', sender_img: '../assets/img/hznu.png', text: '老哥，帮我打印一份，谢啦' },
    { id: 2, sender_name: '李四', theme: '开题报告', sender_img: '../assets/img/index.svg', text: '你这开题怎么弄得呀？我这不行啊，评委老师说不符合要求呢，说做的太简单了' },
    { id: 3, sender_name: '王五', theme: '第三套卷', sender_img: '../assets/img/hznu.png', text: '大神求教怎么做，小弟求教育啊！！！' },
    { id: 4, sender_name: '赵六', theme: '课程表', sender_img: '../assets/img/hznu.png', text: '来一份课程表，我的那个不行了' },
    { id: 5, sender_name: '陈七', theme: '图书馆去吗？', sender_img: '../assets/img/hznu.png', text: '图书馆去吗？我对象闺蜜也去呢，以后别说兄弟没照顾你哦！' }
  ];
  public user_Id: string;

  ngOnInit(): void {
    // 获取搜素历史
    this.getHistory();
  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
    ngDoCheck() {
      // 获取搜素历史
      this.getHistory();
    }
  // 写邮件
  addStudent(courseId) {
    console.log('写邮件');
    // this.router.navigate(['/addstudent/' + courseId]);
  }
  // 搜索收到的邮件
  getEmailList() {

    this.getHistory();
  }
  // 邮件置顶
  puthead(id){

  }
  //点击进入查看邮件
  checkEmail(id){
    alert('查看邮件'+id);
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

  // 获得焦点
  focusInput() {
     this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // console.log('失去焦点');
    // this.flag = !this.flag;
  }
  // 获取历史记录
  getHistory() {
    const historyList = this.storage.get('historylist2');
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
    let historyList = this.storage.get('historylist2');
    if (historyList) { // 存在
      if (historyList.indexOf(this.keywords) === -1) {
        historyList.push(this.keywords);
      }
      this.storage.set('historylist2', historyList);
    } else {  // 不存在且非空格
      if (this.keywords.trim().length > 0) {
        historyList = [];
        historyList.push(this.keywords);
        this.storage.set('historylist2', historyList);
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
              console.log('Cancel');//
          }
        }, {
          text: '删除',
          handler: () => {
            // console.log('Confirm 执行删除'+key);
            this.historyList.splice(key, 1);
            this.storage.set('historylist2', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
    // 删除全部历史记录
    deleteHistory(historyList) {
      this.historyList.splice(historyList, historyList.length);
      this.storage.set('historylist2', this.historyList);
      // 关闭历史记录栏
      this.flag = !this.flag;
    }

}
