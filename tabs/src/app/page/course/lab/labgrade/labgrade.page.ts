import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';
import 'hammerjs';

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
  constructor(
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
  ) {
    for (let i = 0; i < 15; i++) {
      this.leftList.push(`学生${i}`);
    }
  }
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.leftList.push(`学生${15 + i}`);
      }
      // 告诉ion-infinite-scroll数据已经更新，调用complete方法实现无限更新
      event.target.complete();
      // 数据最大时禁用更新
      if (this.leftList.length > 50) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  ngOnInit() {
    this.getHistory();
  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
    // 获取搜素历史
    this.getHistory();
  }
  goBack() {
    this.router.navigate(['/manage/1']);
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
    const labGradeHistory = this.storage.get('labGradeHistory');
    if (labGradeHistory) {
      this.labGradeHistory = labGradeHistory;
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
    this.commonService.saveLocalStorage('labGradeHistory', this.keywords);
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
            this.labGradeHistory.splice(key, 1);
            this.storage.set('labGradeHistory', this.labGradeHistory);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(labGradeHistory) {
    this.labGradeHistory.splice(labGradeHistory, labGradeHistory.length);
    this.storage.set('labGradeHistory', this.labGradeHistory);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }
  // 左滑
  leftSlide() {
    this.LeftStyle = 'leftList';
  }
  // 右滑
  rightSlide() {
    this.LeftStyle = 'leftList1';
  }

}
