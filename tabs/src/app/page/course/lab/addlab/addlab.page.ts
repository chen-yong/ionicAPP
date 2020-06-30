import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-addlab',
  templateUrl: './addlab.page.html',
  styleUrls: ['./addlab.page.scss'],
})
export class AddlabPage implements OnInit {
  public courseId = '';
  public type = 4;
  public authtoken = this.storageService.get('authtoken');
  public workInfo: any = {
        "id": "",
        "name": "",
        "mode": "",
        "isOpen":"",
        // "timeLimit":"",
        // "retryTimes":"",
        "timeLimit":0,  //时间限制，这个好像必须要填，但是没发现哪里可以填写
        "retryTimes":0,  //次数
        "memo": "",
        "createUserId": "",
        "createTime": "",
        "startTime": "",
        "endTime": "",
        "forbiddenCopy": true,
        "forbiddenMouseRightMenu": true,
        "enableClientJudge": false,
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
    this.courseId = location.pathname.substring(8);
    console.log(this.courseId);
    this.getdrawPlot();
  }

  getdrawPlot(){
    //根据登录令牌读出可选的选题策略
    const api = '/api/Course/DrawPlotList?authtoken='+this.authtoken;
    this.commonService.get(api).then((response3: any) => {
      if (response3.retcode === 0) {
        this.drawPlotinfo = response3.info;
        console.log(this.drawPlotinfo);
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
    if (!this.drawPlotId) {
      this.toastTip('请选择抽题策略！', 'danger');
      return;
    }else{
      this.workInfo.drawPlotId = this.drawPlotId;
      console.log(this.drawPlotId);
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择开始时间！', 'danger');
      return;
    }
    if (!this.workInfo.endTime) {
      this.toastTip('请选择结束时间！', 'danger');
      return;
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
    //数据库添加作业
    const api = '/api/course/AddHomeWork?authtoken='+this.authtoken+'&courseId='+this.courseId+'&type='+this.type;
    this.commonService.post(api, this.workInfo).then((response: any) => {
      console.log(response);
      if (response.retcode === 0) {
        this.toastTip('添加成功', 'success');
        // 返回上一层
        this.goBack();
      } else {
        this.toastTip('参数错误', 'danger');
        return;
      }
    });
  }

  datetimeChange(e) {
    console.log(e.detail.value);
  }

}
