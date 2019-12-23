import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.page.html',
  styleUrls: ['./resource.page.scss'],
})
export class ResourcePage implements OnInit {
  public courseId;
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public resourceHistoryList: any[] = [];  // 历史记录
  public resourceList: any[] = [
    { id: 1, name: '文件夹1', src: '../../../../assets/img/hznu.png' },
    { id: 2, name: '文件夹2', src: '../../../../assets/img/hznu.png' },
    { id: 3, name: '文件夹3', src: '../../../../assets/img/hznu.png' },
    { id: 4, name: '文件夹4', src: '../../../../assets/img/hznu.png' },
    { id: 5, name: '文件夹5', src: '../../../../assets/img/hznu.png' },
    { id: 6, name: '文件夹6', src: '../../../../assets/img/hznu.png' },
  ]; // 文件夹列表

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public navController: NavController,
    public storage: StorageService,
    public commonService: CommonService,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    // 接收课程ID
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(9);
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
  // 获取历史记录
  getHistory() {
    const resourceHistoryList = this.storage.get('resourceHistoryList');
    if (resourceHistoryList) {
      this.resourceHistoryList = resourceHistoryList;
    }
  }
  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }
  // 获得焦点
  focusInput() {
    this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // console.log('失去焦点');
  }

  // 点击搜索按钮执行搜索
  doSearch() {
    this.saveHistory();  // 保存搜索关键词
    this.flag = false;
  }

  // 保存历史记录
  saveHistory() {
    this.commonService.saveLocalStorage('resourceHistoryList', this.keywords);
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
            this.resourceHistoryList.splice(key, 1);
            this.storage.set('resourceHistoryList', this.resourceHistoryList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(resourceHistoryList) {
    this.resourceHistoryList.splice(resourceHistoryList, resourceHistoryList.length);
    this.storage.set('resourceHistoryList', this.resourceHistoryList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }
  // 添加资源
  async addResource() {
    const alert = await this.alertController.create({
      header: '新建文件夹',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '请输入文件夹名称'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (type) => {
            console.log(type);
          }
        }
      ]
    });
    await alert.present();
  }
  // 长按文件夹操作
  async operation(id) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteResource();
        }
      }, {
        text: '置顶',
        icon: 'share',
        handler: () => {
          console.log('置顶');
        }
      }, {
        text: '重命名',
        icon: 'create',
        handler: () => {
          this.rename();
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
  // 点击文件夹
  openResource() {
    console.log('打开文件夹');
  }
  // 重命名
  async rename() {
    const alert = await this.alertController.create({
      header: '重命名文件夹',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '请输入文件夹名称',
          value: ''
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: '确定',
          handler: (type) => {
            console.log(type);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除文件夹
  async deleteResource() {
    const alert = await this.alertController.create({
      header: '提示!',
      message: '确定删除吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('删除成功');
          }
        }
      ]
    });

    await alert.present();
  }
}
