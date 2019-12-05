import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { asap } from 'rxjs/internal/scheduler/asap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public alertController: AlertController,
    public router:Router
  ) { }

  //自定义用户数据，方便以后对接
  public userList: any = {
      id: 1,
      name: 'Admin',
      img: 'assets/img/hznu.png',
      color: 'danger',
      intro: '扬帆起航，就此远航'
    };

  //点击退出按钮效果
  async logout(){
    const alert = await this.alertController.create({
      header:"温馨提示",
      message:'<Strong>您确认退出？</Strong>',
      buttons:[
        {
          text:'取消',
          role:'cancel',
          cssClass:'secondary',
          handler:(blah)=>{
            console.log("cancel");
         }
      },{
        text:'删除',
        handler: () => {
          console.log("对不起，退出功能还在开发中~");
        }
      }]
    });
    await alert.present();
  }

  goUserinfo(id){
     console.log('用户ID:'+id);
     this.router.navigate(['/userinfo/',id]);
  }
}
