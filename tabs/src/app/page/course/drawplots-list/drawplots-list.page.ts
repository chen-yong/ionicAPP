import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-drawplots-list',
  templateUrl: './drawplots-list.page.html',
  styleUrls: ['./drawplots-list.page.scss'],
})
export class DrawplotsListPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public toastCtrl: ToastController
  ) { }

  public authtoken = this.storage.get('authtoken');
  public course_id:any;      //课程id
  public drawPlotList: any;  //手动组卷列表
  // public userList:any;       //用户个人信息

  ngOnInit() {
    console.log("传过来的值是："+location.pathname);
    this.course_id = location.pathname.substring(16);
    console.log(this.course_id);
    this.getDrawPlotList(); //获取到手工组卷的列表 

  }

  // 先获取个人信息再获取所有的练习列表
  getDrawPlotList() {
    //获取用户的个人信息
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+this.authtoken;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
          // this.userList=response.info;
          console.log(response.info);
          // 获取所有的练习列表
          var api2 = '/api/DrawPlot/DrawPlotsList?authtoken='+this.authtoken+'&createdUserId='+response.info.id;
          this.commonService.get(api2).then((response2: any) => {
            console.log(response2);
            if (response2.retcode === 0) {
              this.drawPlotList = response2.info;
              //循环遍历处理手工组卷策略列表的时间显示
              this.drawPlotList.forEach((element,index) => {
                this.drawPlotList[index].updateTime = this.drawPlotList[index].updateTime.substring(0,16);
                this.drawPlotList[index].updateTime = this.drawPlotList[index].updateTime.replace('T',' ');
              });
              console.log(this.drawPlotList);
            } else if (response2.retcode === 11) {
              this.toastTip('参数错误', 'danger');
              return;
            } else if (response2.retcode === 13) {
              this.toastTip('令牌authtoken失效', 'danger');
              return;
            } else {
              this.toastTip('未知错误', 'danger');
              return;
            }
          });
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });
  }

  //添加新手工组卷策略
  addDrowplot(id){
    console.log(id);
  }

  //编辑该条手工组卷的策略
  editDrawPlot(id){
    console.log("edit drawplot");
    //this.router.navigate(['/editexercise/' + id]);
  }

  //删除该条手工组卷的策略
  async deleteDrawPlot(id) {
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
            // const api ='/api/Course/DeleteWork?authtoken='+this.authtoken+'&id='+id;
            // this.commonService.get(api).then((response: any) => {
            //   if (response.retcode === 0) {
            //     this.toastTip('删除成功', 'success');
            //     this.getDrawPlotList(); //刷新获取手动组卷列表的信息
            //   }  else {
            //     this.toastTip('删除错误', 'danger');
            //     return;
            //   }
            // });
            console.log("删除该策略");
          }
        }
      ]
    });
    await alert.present();
  }

  //弹窗显示设置
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

  // 返回上一层
  goBack() {
    window.history.go(-1);
  }

}
