import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { CommonService } from '../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public router: Router,
    public commonService: CommonService,
    public toastCtrl: ToastController,
    public storageService: StorageService
  ) { }

  public userInfo:any={
     id:'',
     username:"admin" 
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    var authtoken = this.storageService.get('authtoken');
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+authtoken;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        if (response.info && response.info.userName) {
          this.userInfo.username = response.info.userName;
          this.userInfo.id = response.info.id;
          console.log(this.userInfo.id );
        } else {
          this.userInfo.username = '';
        }
      } else {
        this.toastTip('参数错误');
        return;
      }
    });
  }
    // 弹窗设置
    async toastTip(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 1000,
        position: 'top',
        color: 'danger',
        cssClass: ''
      });
      toast.present();
    }
  

  writeEmail(){
    console.log('write');
    // this.router.navigate(['/emailwrite/',this.userInfo.id]);
    this.router.navigate(['/emailwrite/',1]);
  }

}
