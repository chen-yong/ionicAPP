import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editlab',
  templateUrl: './editlab.page.html',
  styleUrls: ['./editlab.page.scss'],
})
export class EditlabPage implements OnInit {
  public labId = '';
  public labInfo: any = {
    name: '',
    tacticsList: [] = [
      { id: 1, name: '实验1', },
      { id: 2, name: '实验2', },
    ],
    tactics: '',
    startTime: '',
    endTime: '',
    addTime: '',
    explain: '',
    falg: 'false',
    falgTime: '',
    score: '',
    showGradeList: [] = [
      { id: 1, name: '展示分数' },
      { id: 2, name: '不展示分数' },
    ],
    showGrade: '',
    parRadioList: [] = [
      { id: 1, value: '1', name: '禁止复制题目', isChecked: 'false' },
      { id: 2, value: '2', name: '禁止右键', isChecked: 'false' },
      { id: 3, value: '3', name: '开启学生端阅卷', isChecked: 'false' },
      { id: 4, value: '4', name: '查卷时标准答案可见', isChecked: 'false' },
    ]
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
  ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.labId = location.pathname.substring(8);
  }
  goBack(labId) {
    this.router.navigate(['/lab/' + labId]);
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
    if (!this.labInfo.name) {
      this.toastTip('请填写作业名称！');
      return;
    }
    if (!this.labInfo.tactics) {
      this.toastTip('请选择抽题策略！');
      return;
    }
    if (!this.labInfo.startTime) {
      this.toastTip('请选择开始时间！');
      return;
    }
    if (!this.labInfo.startTime) {
      this.toastTip('请选择结束时间！');
      return;
    }
    if (!this.labInfo.startTime) {
      this.toastTip('请选择补交截止时间！');
      return;
    }
    if (!this.labInfo.startTime) {
      this.toastTip('请填写总分！');
      return;
    }
    if (!this.labInfo.startTime) {
      this.toastTip('请选择成绩展示！');
      return;
    }
    console.log(this.labInfo);
  }
  datetimeChange(e) {
    console.log(e.detail.value);
  }
}
