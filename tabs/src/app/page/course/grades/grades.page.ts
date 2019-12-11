import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage implements OnInit {
  public courseId;
  public leftList: any[] = [];
  public rightList: any[] = [];
  public selectedId: any = '';  /*选中的学生id*/


  constructor(
    public location: Location,
    public router: Router,
    public toastController: ToastController,
    public common: CommonService,
    public alertController: AlertController,
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
      // this.getRightData(this.leftList[0].id);
    });
  }
  // 获取右侧试卷详细数据
  // getRightData(id) {
  //   this.selectedId = id;
  //   const api = '' + id;
  //   this.common.get(api).then((response: any) => {
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

}
