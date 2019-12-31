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
   public tongxunluList: any[] = [
    {id:1201,kind:'任课老师',name:'张三',image:'../assets/img/hznu.png'},
    {id:1202,kind:'系统管理员',name:'李四',image:'../assets/img/hznu.png'},
    {id:1203,kind:'任课老师',name:'王武',image:'../assets/img/hznu.png'},
    {id:1204,kind:'学生',name:'阿四',image:'../assets/img/hznu.png'},
    {id:1205,kind:'学生',name:'布鲁',image:'../assets/img/hznu.png'},
    {id:1206,kind:'学生',name:'陈莉',image:'../assets/img/hznu.png'},
    {id:1207,kind:'学生',name:'梦泽',image:'../assets/img/hznu.png'},
    {id:1208,kind:'任课老师',name:'王文',image:'../assets/img/hznu.png'},
    {id:1209,kind:'任课老师',name:'王好汉',image:'../assets/img/hznu.png'},
    {id:1210,kind:'系统管理员',name:'胡娜',image:'../assets/img/hznu.png'},
    {id:1211,kind:'任课老师',name:'query',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'文章',image:'../assets/img/hznu.png'},
    {id:1213,kind:'任课老师',name:'谢家局',image:'../assets/img/hznu.png'},
    {id:1214,kind:'任课老师',name:'依依',image:'../assets/img/hznu.png'},
    {id:1215,kind:'任课老师',name:'大业',image:'../assets/img/hznu.png'},
    {id:1216,kind:'任课老师',name:'饿',image:'../assets/img/hznu.png'}
  ];
  //邮件内容
  public emailDetail:any={
      outid:2014211911,
      theme:'',
      context:'',
      fujian:''
  }
  public isshow = false; //判断添加收件人按钮是否显示
  public shoujianren:any[]=[]
  public isHas = false   //判断加入的收件人是否重复
  public add_id:any      //传过来的收件人id

  constructor(    
    public toastCtrl: ToastController,
    public router: Router,
    public location: Location,
    public modalController: ModalController,
    ){ 

  }

  ngOnInit() {
    this.add_id=location.pathname.substring(12);
    console.log(this.add_id)
    // this.courseId = location.pathname.substring(9);
    this.tongxunluList.forEach(element => {
      if(element.id == this.add_id){
        this.shoujianren.push(element)
      }
    });
  }

  //弹窗组件关闭功能设置
  doClose() {
    this.shoujianren = null;
    this.router.navigate(['/tabs/tab2']);
    //this.navParams.data.modal.dismiss();//关闭这个弹出的组件
  }
  //邮件发送功能设置
  submit(){
    this.toastTip("您的邮件已经成功发送");
    console.log(this.emailDetail.outid+' '+this.emailDetail.theme+' '+this.emailDetail.context)
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
      //打印添加收件人传过来的数据
      console.log(data.result.msg)
      //循环遍历，将添加的收件人数据不重复的添加到shoujianren数组中
      data.result.msg.forEach(element => {
        this.shoujianren.forEach(elements => {
          if(elements.id==element.id){
            this.isHas = true;
          }
        });
        if(this.isHas == false){
          this.shoujianren.push(element);
        }
        this.isHas=false;
      });
    }
  }

  //删除添加的收件人
  deleteadd(key){
     this.shoujianren.splice(key,1);
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
