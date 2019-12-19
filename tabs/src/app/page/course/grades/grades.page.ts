import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public gradesHistoryList: any[] = [];  // 历史记录
  public courseId;
  public leftList: any[] = [];
  public rightList: any[] = [];
  public selectedId: any = '';  /*选中的学生id*/


  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
    public commonService: CommonService,
    public alertController: AlertController,
    public storage: StorageService,
  ) {
    // 左侧模拟数据
    for (let i = 1; i <= 15; i++) {
      this.leftList.push(`学生${i}`);
    }
  }

  ngOnInit() {
     // 接收课程ID
     console.log(location.pathname);
     this.courseId = location.pathname.substring(8);
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
  // 获取左侧试卷数据
  getLeftData() {
    const api = '';
    this.commonService.get(api).then((response: any) => {
      this.leftList = response.result;
      // this.getRightData(this.leftList[0].id);
    });
  }
  // 获取右侧试卷详细数据
  // getRightData(id) {
  //   this.selectedId = id;
  //   const api = '' + id;
  //   this.commonService.get(api).then((response: any) => {
  //     this.rightList = response.result;
  //   });
  // }
  // 下拉请求更多
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.leftList.push(`学生${15 + i}`);
      }
      // 告诉ion-infinite-scroll数据已经更新，调用complete方法实现无限更新
      event.target.complete();
      // 数据最大时禁用更新
      if (this.leftList.length > 80) {
        event.target.disabled = true;
      }
    }, 1000);
  }
  // 设置成绩比例
  async gradeSet(id) {
    const alert = await this.alertController.create({
      header: '成绩比列设定!',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          min: 0,
          max: 100,
          placeholder: '作业比例'
        },
        {
          name: 'name6',
          type: 'number',
          min: 0,
          max: 100,
          placeholder: '实验比例'
        },
        {
          name: 'name6',
          type: 'number',
          min: 0,
          max: 100,
          placeholder: '文秘类技能操作考试比例'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Ok');
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
  }
  // 获取历史记录
  getHistory() {
    const gradesHistoryList = this.storage.get('gradesHistoryList');
    if (gradesHistoryList) {
      this.gradesHistoryList = gradesHistoryList;
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
    this.commonService.saveLocalStorage('gradesHistoryList', this.keywords);
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
            this.gradesHistoryList.splice(key, 1);
            this.storage.set('gradesHistoryList', this.gradesHistoryList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(gradesHistoryList) {
    this.gradesHistoryList.splice(gradesHistoryList, gradesHistoryList.length);
    this.storage.set('gradesHistoryList', this.gradesHistoryList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }

}
