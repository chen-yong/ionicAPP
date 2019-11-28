import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.page.html',
  styleUrls: ['./studentinfo.page.scss'],
})
export class StudentinfoPage implements OnInit {

  constructor(
     public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  // 保存学生信息修改
  saveStudentInfo(){
    console.log("保存");
  }
  // 密码重置
   async resetPassword() {
    const alert = await this.alertController.create({
      header: '温馨提示!',
      message: '<strong>您确认重置密码</strong>？',
      buttons: [
        {
          text: '不重置',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('不重置');
          }
        }, {
          text: '重置',
          handler: () => {
            // 重置密码
            console.log('重置');
            // 刷新页面
          }
        }
      ]
    });

    await alert.present();
  }

}
