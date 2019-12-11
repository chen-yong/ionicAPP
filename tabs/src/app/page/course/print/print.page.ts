import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  public courseId;
  public leftList: any[] = [];
  public rightList: any[] = [];
  public selectedId: any = '';  /*选中的试卷id*/

  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
    public common: CommonService,
    public alertController: AlertController,
  ) {
    // 左侧模拟数据
    for (let i = 0; i < 20; i++) {
      this.leftList.push(`试卷${i}`);
    }

    // 右侧数据
  }

  ngOnInit() {
    // 接收课程ID
    console.log(location.pathname);
    this.courseId = location.pathname.substring(7);
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 获取左侧试卷数据
  getLeftData() {
    const api = '';
    this.common.get(api).then((response: any) => {
      this.leftList = response.result;
      this.getRightData(this.leftList[0].id);
    });
  }
  // 获取右侧试卷详细数据
  getRightData(id) {
    this.selectedId = id;
    const api = '' + id;
    this.common.get(api).then((response: any) => {
      this.rightList = response.result;
    });
  }
  // 重启
  async reset() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要重启吗!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消重启');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('确认重启');
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除
  async delete() {
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
            console.log('确认删除');
          }
        }
      ]
    });
    await alert.present();
  }
  // 添加打印任务
  addPtint() { 
    this.router.navigate(['/addprint']);
  }

}
