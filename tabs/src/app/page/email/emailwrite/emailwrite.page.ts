import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';   //路由插件
import { Location } from '@angular/common'; //接受理由传值

import { ModalController } from '@ionic/angular';//控制组件的弹出
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';//导入写邮件组件
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-emailwrite',
  templateUrl: './emailwrite.page.html',
  styleUrls: ['./emailwrite.page.scss'],
})
export class EmailwritePage implements OnInit {

  //邮件内容
  public emailDetail:any={
      sender:1,
      subject:'',
      body:'',
      isImportant:false
  }
  public isshow = false; //判断添加收件人按钮是否显示
  public shoujianren:any[]=[]
  public isHas = false   //判断加入的收件人是否重复
  // public email_id:any      //传过来的信件id，判断是否是回信
  public add_id;  //传值过来的收信人的id
  public sender_id; //用户id,也就是发件人id
  public email_id; //用于临时存储刚刚发送的那份信件的id。
  
  public tongxunluList:any[]=[];  //通讯录  【id:id , kind:userIdentity03, name:realName , image:avatar】
  public authtoken = this.storageService.get('authtoken');  //登录令牌
  public property00 :string = ''; //班级

  constructor(    
    public toastCtrl: ToastController,
    public router: Router,
    public location: Location,
    public commonService: CommonService,
    public storageService: StorageService,
    public alertController: AlertController,
    public modalController: ModalController
    ){ 

  }

  ngOnInit() {
    // this.email_id=location.pathname.substring(12);
    // console.log("需要回信的id "+this.email_id)
    this.add_id=location.pathname.substring(12);
    console.log("需要回信的id "+this.add_id)
  
    this.getproperty00();

  }
  
  //获取用户的通讯录，老师和同班同学
  getTongxunluList(){
    this.tongxunluList = [];
    var api = '/api/Message/GetTongxunlu?authtoken='+this.authtoken+'&property00='+this.property00;
    this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
            response.info.forEach(element => {
              //将需要的元素读出来放入数组中
              this.tongxunluList.push({id:element.id,kind:element.userIdentity03,name:element.realName,image:element.avatar});
            });
              //遍历通讯录得到传过来的值 如果一开始没有收件人的话传过来的id值为1
            if(this.add_id != 1){  
              this.tongxunluList.forEach(element => {
                if(element.id == this.add_id && this.add_id!=this.sender_id){
                  this.shoujianren.push(element)
                }
              });
            }
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
    });    
  }

  getproperty00(){
    var api = '/api/Users/GetUserByAuthtoken?authtoken='+this.authtoken;
    this.commonService.get(api).then((response: any) => {
      console.log(response.info);
      if (response.retcode == 0) {
        this.property00 = response.info.property00;
        this.sender_id = response.info.id;
        this.emailDetail.sender = this.sender_id;
        console.log("用户ID:"+this.emailDetail.sender);
        console.log("用户班级:"+this.property00);
        this.getTongxunluList();
      } else {
        this.toastTip('参数错误','danger');
        return;
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
    console.log(this.emailDetail);
    if(this.shoujianren[0]){
      //遍历收件人信息，根据id给里面的每个人发邮件
      this.shoujianren.forEach(element => {
        var api = '/api/Message/AddMessage?authtoken='+this.authtoken;
        this.commonService.post(api, this.emailDetail).then((response: any) => {
          // console.log(response);
          if (response.retcode == 0) {
              this.email_id = response.info.id;  //信件的信id读取
              console.log("新建的信的id"+this.email_id+"收件人id"+element.id);
              var api2 = '/api/Message/NewCodeAndAddPeMessageReceive?authtoken='
                            +this.authtoken+'&id='+this.email_id+'&userid='+element.id;
              this.commonService.get(api2).then((response2: any) => {
                if (response2.retcode == 0) {
                  console.log("发给id："+element.id+"已经成功");
                } else {
                  this.toastTip('参数错误','danger');
                  return;
                }
              });
          } else {
            this.toastTip('保存失败', 'danger');
            return;
          }
        });
      });
      this.toastTip("您的邮件已经成功发送","success");
      this.doClose();
    }else{
      this.toastTip("请添加收件人","danger");
    }
  }

  // 弹窗设置
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
        if(element.id == this.sender_id){
          this.isHas = true;
        }
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

  //标为重要文件
  beImportant(){
    this.emailDetail.isImportant = true;
    console.log(this.emailDetail.isImportant);
  }

  //标为不重要文件
  beNoImportant(){
    this.emailDetail.isImportant = false;
    console.log(this.emailDetail.isImportant);
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
