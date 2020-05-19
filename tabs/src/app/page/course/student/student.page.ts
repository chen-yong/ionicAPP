import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { IonContent } from '@ionic/angular';  // 插入滚动组件，在ionic3时为Content
import { ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';  // 提示弹出层


@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public storageService: StorageService,
    public commonService: CommonService,
    public elementRef: ElementRef,
    public ref: ChangeDetectorRef,
    public toastCtrl: ToastController,
  ) { }
  @ViewChild(IonContent, { static: true }) content: IonContent;

  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any;  // 历史记录
  public studentList: any;
  public courseId;
  public page = 1;
  public count = 100;
  public authtoken = this.storageService.get('authtoken');

  ngOnInit() {
    // 接收课程ID
    this.courseId = location.pathname.substring(9);
    // 根据课程ID查找所有学生列表
    this.getStudentList();
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
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
    // 获取搜素历史
    // this.getHistory();
  }
  // 返回上一层
  goBack(courseId) {
    window.history.go(-1);
  }
  // 添加学生
  addStudent(courseId) {
    this.router.navigate(['/addstudent/' + courseId]);
  }
  // 编辑学生
  editStudent(courseId) {
    this.router.navigate(['/editstudent/' + courseId]);
  }
  // 搜索学生
  getStudentList() {
    const api = 'http:/api/Users/StudentList?authtoken='+this.authtoken+'&courseId='+this.courseId+'&keyword='+this.keywords+'&page='+this.page+'&count='+this.count;
    this.commonService.get(api).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.studentList = response.info;
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
  // 获得焦点
  // focusInput() {
  //   this.flag = true;
  // }
  // 失去焦点
  // blurInput() {
  //   this.flag = !this.flag;
  // }
  // 删除学生事件
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
            return;
          }
        }, {
          text: '确定',
          handler: () => {
            const api ='http:/api/Users/DeleteUser?authtoken='+this.authtoken+'&id='+id;
            this.commonService.get(api).then((response: any) => {
              if (response.retcode === 0) {
                this.toastTip('删除成功', 'success');
                this.getStudentList();
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

  // 重置密码
  async resetPwd(id) {
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
            return false;
          }
        }, {
          text: '确定',
          handler: () => {
            const api ='http:/api/Users/RetsetPwd?authtoken='+this.authtoken+'&id='+id;
            this.commonService.get(api).then((response: any) => {
              if (response.retcode === 0) {
                this.toastTip('重置成功', 'success');
                return;
                this.getStudentList();
              }  else {
                this.toastTip('重置失败', 'danger');
                return;
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.getStudentList();
  }

}
