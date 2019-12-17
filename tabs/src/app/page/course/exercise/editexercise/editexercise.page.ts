import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editexercise',
  templateUrl: './editexercise.page.html',
  styleUrls: ['./editexercise.page.scss'],
})
export class EditexercisePage implements OnInit {
  public exerciseId = '';
  public exerciseInfo: any = {
    name: '',
    tacticsList: [] = [
      { id: 1, name: '实验1', },
      { id: 2, name: '实验2', },
    ],
    tactics: '',
    startTime: '',
    endTime: '',
    explain: '',
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
    this.exerciseId = location.pathname.substring(8);
  }
  goBack() {
    this.router.navigate(['/exercise/1' ]);
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
    if (!this.exerciseInfo.name) {
      this.toastTip('请填写练习名称！');
      return;
    }
    if (!this.exerciseInfo.tactics) {
      this.toastTip('请选择抽题策略！');
      return;
    }
    if (!this.exerciseInfo.startTime) {
      this.toastTip('请选择开始时间！');
      return;
    }
    if (!this.exerciseInfo.startTime) {
      this.toastTip('请选择结束时间！');
      return;
    }
    console.log(this.exerciseId);
  }
  datetimeChange(e) {
    console.log(e.detail.value);
  }

}
