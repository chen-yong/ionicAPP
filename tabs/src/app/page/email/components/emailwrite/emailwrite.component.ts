import { Component, OnInit } from '@angular/core';
// 接收传值
import { ModalController, NavParams } from '@ionic/angular';//控制组件的弹出
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-emailwrite',
  templateUrl: './emailwrite.component.html',
  styleUrls: ['./emailwrite.component.scss'],
})
export class EmailwriteComponent implements OnInit {

  //自定义通讯录
  public peopleList: any[] = [
    { id:2019001 , name:'张三'},
    { id:2019002 , name:'李四'},
    { id:2019003 , name:'王武'},
    { id:2019004 , name:'赵六'}
  ];
  //邮件内容
  public emailDetail:any={
      outid:2014211911,
      inid:0,
      theme:'',
      context:'',
      fujian:''
  }

  constructor(
    public modalController: ModalController,
    public navParams: NavParams, //控制组件的弹出
    public toastCtrl: ToastController,
  ) { 
    console.log(this.navParams);
    //打印最初传过来的值，但这里不需要传值，接口先留着
  }

  ngOnInit() {}

  //弹窗组件关闭功能设置
  doClose() {
    this.navParams.data.modal.dismiss();//关闭这个弹出的组件
  }
  //邮件发送功能设置
  submit(){
    this.toastTip("您的邮件已经成功发送");
  }
  // 自定义的提示信息控件
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

}
