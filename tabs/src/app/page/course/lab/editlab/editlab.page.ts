import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-editlab',
  templateUrl: './editlab.page.html',
  styleUrls: ['./editlab.page.scss'],
})
export class EditlabPage implements OnInit {
  public workId = '';
  public authtoken = this.storageService.get('authtoken');
  public workInfo: any = {
        "id": "",
        "name": "",
        "mode": "",
        "isOpen":"",
        "timeLimit":"",
        "retryTimes":"",
        "memo": "",
        "createUserId": "",
        "createTime": "",
        "startTime": "",
        "endTime": "",
        "forbiddenCopy": true,
        "forbiddenMouseRightMenu": true,
        "enableClientJudge": true,
        "keyVisible": true,
        "drawPlotId": "",
        "courseId":"",
        "enableMutualJudge": null,
        "mutualJudgeEndTime": null,
        "setScore": "",
        "viewOneWithAnswerKey": false,
        "ord": 0,
        "scoreAppear": "",
        "delayEndTime": null,
        "delayPercentOfScore": null,
        "ipallowAccessCheck": false
  };
  public isscoreAppear = false;  //是否开启成绩显示
  public drawPlotinfo:any[]=[];  //该用户可以选的所以选题策略
  public begindrawPlot:any=[];   //读取自己最初选择的策略
  public flag = true;      //最初的策略是否在可选列表中
  public drawPlotId:any;   //用户存储选择的策略id
  
  // 自定义option
  public customPickerOptions = {
    buttons: [{
      text: '取消',
      handler: () => console.log('取消!')
    }, {
      text: '确认',
      handler: () => {
        console.log('确认');
      }
    }]
  };

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public storageService: StorageService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.workId = location.pathname.substring(9);
    console.log(this.workId);
    this.getHome();
  }
  
  goBack() {
    window.history.go(-1);
  }
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
  signUp() {
    if (!this.workInfo.name) {
      this.toastTip('请填写作业名称！', 'danger');
      return;
    }
    if (!this.workInfo.drawPlotId) {
      this.toastTip('请选择抽题策略！', 'danger');
      return;
    }else{
      this.workInfo.drawPlotId = this.drawPlotId;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择开始时间！', 'danger');
      return;
    }
    if (!this.workInfo.endTime) {
      this.toastTip('请选择结束时间！', 'danger');
      return;
    }
    if (this.workInfo.delayEndTime) {
      if(!this.workInfo.delayPercentOfScore){
        this.toastTip('设置补交截止时间必须填写补交得分比例！', 'danger');
        return;
      }
    }
    if (!this.workInfo.setScore) {
      this.toastTip('请填写总分！', 'danger');
      return;
    }
    if(this.isscoreAppear == true){
      this.workInfo.scoreAppear = 1;
    }else{
      this.workInfo.scoreAppear = 2;
    }
    console.log(this.workInfo);
    const api = 'http:/api/Course/EditHomeWork?authtoken='+this.authtoken+'&id='+this.workInfo.id;
    this.commonService.post(api, this.workInfo).then((response: any) => {
      // console.log(response);
      if (response.retcode === 0) {
        this.toastTip('作业编辑成功', 'success');
        // 关闭
        this.goBack();
      } else {
        this.toastTip('作业编辑失败', 'danger');
        return;
      }
    });
  }

  datetimeChange(e) {
    console.log(e.detail.value);
  }

  //初始化读取数据
  getHome(){
    const api = '/api/Course/HomeWork?authtoken='+this.authtoken+'&id='+this.workId;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode === 0) {
          this.workInfo = response.info;
          if(response.info.scoreAppear == 1){
            this.isscoreAppear = true;
          }
          console.log(this.workInfo);
          //根据策略id获取策略数据
          const api2 = '/api/Course/GetDrawPlotById?authtoken='+this.authtoken+'&id='+response.info.drawPlotId;
          this.commonService.get(api2).then((response2: any) => {
            if (response2.retcode === 0) {
              this.begindrawPlot = response2.info;     //初始策略id读出来的策略信息
              console.log(this.begindrawPlot);
              this.drawPlotId = this.begindrawPlot.id;     //最初显示的策略id
            }else {
              this.toastTip('未知错误', 'danger');
              return;
            }
          });
          //根据登录令牌读出可选的选题策略
          const api3 = '/api/Course/DrawPlotList?authtoken='+this.authtoken;
          this.commonService.get(api3).then((response3: any) => {
            if (response3.retcode === 0) {
              this.drawPlotinfo = response3.info;
              console.log(this.drawPlotinfo);
              this.drawPlotinfo.forEach(element => {
                if(element.id == this.begindrawPlot.id){
                  this.flag = false; //当策略在可选序列中，flag设为 false
                }
              });
            } else if (response3.retcode === 11) {
              this.toastTip('参数错误', 'danger');
              return;
            } else if (response3.retcode === 13) {
              this.toastTip('令牌authtoken失效', 'danger');
              return;
            } else {
              this.toastTip('未知错误', 'danger');
              return;
            }
          });
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

}
