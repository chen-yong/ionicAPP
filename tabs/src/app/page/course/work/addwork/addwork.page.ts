import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {

  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public storageService: StorageService,
    public commonService: CommonService,
  ) { }
  public courseId = '';
  public type = 3;
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

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(9);
    console.log(this.courseId);
  }
  goBack() {
    window.history.go(-1);
  }
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
  signUp() {
    if (!this.workInfo.name) {
      this.toastTip('请填写作业名称！', 'danger');
      return;
    }
    if (!this.workInfo.tactics) {
      this.toastTip('请选择抽题策略！', 'danger');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择开始时间！', 'danger');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择结束时间！', 'danger');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择补交截止时间！', 'danger');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请填写总分！', 'danger');
      return;
    }
    if (!this.workInfo.startTime) {
      this.toastTip('请选择成绩展示！', 'danger');
      return;
    }
    console.log(this.workInfo);
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
