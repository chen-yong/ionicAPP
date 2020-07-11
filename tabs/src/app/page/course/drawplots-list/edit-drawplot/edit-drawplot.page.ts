import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-edit-drawplot',
  templateUrl: './edit-drawplot.page.html',
  styleUrls: ['./edit-drawplot.page.scss'],
})
export class EditDrawplotPage implements OnInit {

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public storageService: StorageService,
    public commonService: CommonService
  ) { }

  public authtoken = this.storageService.get('authtoken');  //登录令牌
  public drawPlotId = '';     //策略id
  public LeftStyle: any = 'leftList1';  //左滑右滑页面变动控制开关
  public page = 1;      //页数
  public count = 10;    //每页条数
  public hasmore = true;      //是否加载更多
  public labId:any;     //该策略题库id
  public topicList:any;       //该策略存在的所有题型
  public topicId:any;    //算啦，题型还是一个个来吧
  public difficultyList:any;  //难度，例如: 1,2,3,4
  public checkdifficultyList:any = [   //难度列表:简单1,较简单2,中等3,较难4,难5
    { val : '简单', isChecked: true },
    { val : '较简单', isChecked: true },
    { val : '中等', isChecked: true },
    { val : '较难', isChecked: true },
    { val : '难', isChecked: true }
  ];

  ngOnInit() {
    // console.log('URl:' + location.pathname);
    this.drawPlotId = location.pathname.substring(15);
    console.log(this.drawPlotId);
    this.getDrawPlot();

  }

  getDrawPlot(){
    //根据drawPlotId获取labId的值
    var api = '/api/Course/GetDrawPlotById?authtoken='+this.authtoken+'&id='+this.drawPlotId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
          console.log(response.info);
          this.labId = response.info.labId;
          //根据drawPlotId获取该策略存在的所有题型。
          var api2 = '/api/DrawPlot/DrawPlotTopic?authtoken='+this.authtoken+'&labId='+this.labId;
          this.commonService.get(api2).then((response: any) => {
            if (response.retcode === 0) {
              this.topicList = response.info;
              console.log(this.topicList);

            } else {
              this.toastTip('未知错误', 'danger');
              return;
            }
          });
      } else {
        this.toastTip('未知错误', 'danger');
        return;
      }
    });
  }

  // 左滑
  leftSlide() {
    this.LeftStyle = 'leftList';
  }
  // 右滑
  rightSlide() {
    this.LeftStyle = 'leftList1';
  }

  //回退
  goBack() {
    window.history.go(-1);
  }
  //弹窗设置
  async toastTip(message: string,color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color,
    });
    toast.present();
  }

}
