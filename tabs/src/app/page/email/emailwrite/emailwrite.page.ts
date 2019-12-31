import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';   //路由插件
import { Location } from '@angular/common'; //接受理由传值

import { ModalController } from '@ionic/angular';//控制组件的弹出
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';//导入写邮件组件

@Component({
  selector: 'app-emailwrite',
  templateUrl: './emailwrite.page.html',
  styleUrls: ['./emailwrite.page.scss'],
})
export class EmailwritePage implements OnInit {

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
      context:'你好，撒大声地所多所多所多所多所多所多撒大声地收到收到收到山东省但是毒杀的收到撒大声地收到收到收到收到收到收到收到收到收到动手术但是但是但是收到收到收到',
      fujian:''
  }
  public isshow = false;

  constructor(    
    public toastCtrl: ToastController,
    public router: Router,
    public location: Location,
    public modalController: ModalController,
    ){ 

  }

  ngOnInit() {
    console.log(location.pathname);
    // this.courseId = location.pathname.substring(9);
  }

  //弹窗组件关闭功能设置
  doClose() {
    this.router.navigate(['/inbox/']);
    //this.navParams.data.modal.dismiss();//关闭这个弹出的组件
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

  // 添加收件人功能
  async addAddressee(){
    const modal = await this.modalController.create({
      component: AddpeopleComponent,
      componentProps: { value: '' } // 传值
    });
    await modal.present();
    //监听当前模态对话框销毁事件
    const { data } = await modal.onDidDismiss();
    if(data.result.isDate==1){
      console.log(data.result.msg)
    }
  }

  // 收件人点击获得焦点
  focusInput1(){
    this.isshow=true;
  }
  // 主题点击获得焦点,目的是隐藏添加收信人按键
  focusInput2(){
    this.isshow=false;
  }
    // 内容点击获得焦点,目的是隐藏添加收信人按键
  focusInput3(){
    this.isshow=false;
  }
  // 收件人点击失去焦点
  blurInput() {
    // console.log('失去焦点');
    // this.isshow=false;
  }

}
