import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addwork',
  templateUrl: './addwork.page.html',
  styleUrls: ['./addwork.page.scss'],
})
export class AddworkPage implements OnInit {
  public workId = '';
  public workInfo: any = {
    name: '',
    tacticsList: [] = [
      { id: 1, name: '作业1', },
      { id: 2, name: '作业2', },
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
    this.workId = location.pathname.substring(9);
  }
  goBack(workId) {
    this.router.navigate(['/work/' + workId]);
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

}
