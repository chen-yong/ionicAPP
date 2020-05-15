import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-editwork',
  templateUrl: './editwork.page.html',
  styleUrls: ['./editwork.page.scss'],
})
export class EditworkPage implements OnInit {
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
    this.workId = location.pathname.substring(10);
    console.log(this.workId);
    this.getHome();
  }
  goBack() {
    window.history.go(-1);
  }
  async toastTip(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1000,
      position: 'top',
      cssClass: 'errToast',
      color: 'danger',
    });
    toast.present();
  }
  signUp() {
    if (!this.workInfo.name) {
      this.toastTip('请填写作业名称！');
      return;
    }
    if (!this.workInfo.tactics) {
      this.toastTip('请选择抽题策略！');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择开始时间！');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择结束时间！');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择补交截止时间！');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请填写总分！');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择成绩展示！');
      return;
    }
    console.log(this.workInfo);
  }

  datetimeChange(e) {
    console.log(e.detail.value);
  }
  getHome(){
    const api = 'http:/api/Course/HomeWork?authtoken='+this.authtoken+'&id='+this.workId;
    this.commonService.get(api).then((response: any) => {
      console.log(response);
      if (response.retcode === 0) {
        this.workInfo = response.info;
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
