import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service'; // 引用CommonService
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public courseList: any;
  public authtoken = this.storageService.get('authtoken'); //验证令牌
  public userIdentity:any;
  public userId:any;

  constructor(
    public nav: NavController,
    public router: Router,
    public storageService: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController,
  ) { }  

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getUserList();
  }

  getUserList(){
    var authtoken = this.storageService.get('authtoken');
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
          this.userIdentity = response.info.userIdentity03;
          this.userId = response.info.id;
          console.log("用户ID："+this.userId+"，用户身份是："+this.userIdentity+"【1是学生；2是老师】");
          this.getCourseList();
      } else {
        this.toastTip('参数错误');
        return;
      }
    });
  }

  // 根据登录用户的身份用不同的方法获取课程列表
  getCourseList() {
    if(this.userIdentity==2){
        var api = 'api/Course/GetCoursesList?authtoken='+this.authtoken;
        this.commonService.get(api).then((response: any) => {
          console.log(response);
          if (response.retcode == 0) {
            this.courseList = response.info;
          } else {
            this.toastTip('参数错误');
            return;
          }
        });
    }else if(this.userIdentity==1){
        var api = 'api/Course/GetCourseByStudent?authtoken='+this.authtoken+'&userId='+this.userId;
        this.commonService.get(api).then((response: any) => {
          console.log(response);
          if (response.retcode == 0) {
            this.courseList = response.info;
          } else {
            this.toastTip('参数错误');
            return;
          }
        });
    }
  }  

  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color: 'danger',
    });
    toast.present();
  }
  // 进入课程管理页面
  goCourse(id) {
    console.log('课程ID:' + id);
    if(this.userIdentity == 2){
      this.router.navigate(['/manage/', id]);
    }else if(this.userIdentity == 1){
      this.router.navigate(['/manage-stu/', id]);
    }
  }
  // 搜索框改变事件
  getItems() { }
  // 输入框清除事件
  cancel() { }

}
