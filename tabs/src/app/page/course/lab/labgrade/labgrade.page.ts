import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';
import 'hammerjs';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-labgrade',
  templateUrl: './labgrade.page.html',
  styleUrls: ['./labgrade.page.scss'],
})
export class LabgradePage implements OnInit {
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public labGradeHistory: any[] = [];  // 历史记录
  public leftList: any[] = [];
  public rightList: any[] = [];
  public selectedId: any = '';  /*选中的学生id*/
  public LeftStyle: any = 'leftList1';
  public courseId: any = '';
  public page = 1;
  public count = 10;
  public authtoken = this.storage.get('authtoken');
  public type = 4;
  public userId: any = '';
  public hasmore = true;
  public studentInfo: any[]=[{
    "id": "",
    "userName": "",
    "userNO": "",
    "realName": "",
    "sex": "",
    "userIdentity02": "",
    "mobile": ""
  }];
  public scoreinfo:any=[]; //保存具体学生的各实验名字和成绩

  constructor(
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.courseId = location.pathname.substring(10);
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
    // 页码设为第一页
    this.page = 1;
    // 清空拼接数据
    this.leftList = [];
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
          this.getStudnetInfo(this.userId);
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
    this.scoreinfo = [];
    this.selectedId = userId;
    const api = '/api/Course/ScoreInfo?authtoken='+this.authtoken+'&courseId='+this.courseId+'&type='+this.type+'&userId='+userId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
        // console.log(response);
        this.rightList = response.info;
        console.log(this.rightList);
        for(var key in this.rightList){
          this.scoreinfo.push({"name": key,"score":this.rightList[key]});
        }
        console.log(this.scoreinfo);
      } else {
        this.toastTip('未知错误', 'danger');
        return;
      }
    });
  }

  getLeftData(id) {
    this.getScoreInfo(id);
    this.getStudnetInfo(id);
  }
  // 获取单个学生的基本信息
  getStudnetInfo(userId) {
    const api = '/api/Users/GetStudent?authtoken='+this.authtoken+'&id='+userId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
        this.studentInfo = response.info;
        // console.log(this.studentInfo);
      } else {
        this.toastTip('未知错误', 'danger');
        return;
      }
    });
  }
}
