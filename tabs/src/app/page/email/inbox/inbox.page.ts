import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; //弹出组件
import { CommonService } from '../../../services/common.service';
import { ToastController } from '@ionic/angular';  // 提示弹出层


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  constructor(
    // public navController: NavController,
    public location: Location,
    public router: Router,
    public modalController: ModalController, //弹出组件
    public alertController: AlertController,
    public storageService: StorageService,
    public toastCtrl: ToastController,
    public commonService: CommonService
  ) { }

  public iskong=false;  //判断是否收到邮件
  public flag = false;  //历史记录控件
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any[] = [];  // 历史记录
  public user_Id: string; //用户的id

  public emailList2:any[]=[]; //存储最初数据库读出来的信件消息
  public emaildetail:any[]=[];
  public emailList:any[]=[];  //存储最后处理过的信件消息
  public authtoken = this.storageService.get('authtoken');

  ngOnInit(): void {
    // 获取搜素历史
    this.getHistory();

    console.log(location.pathname);
    this.user_Id = location.pathname.substring(7);
    console.log(this.user_Id);
    this.getUserEmailList();//获取该用户收到的信件

  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
      // 获取搜素历史
      this.getHistory();
    }
    
  // // 点击事件model框显示写邮件页面
  // async showaddEmailModel( ) {
  //     const modal = await this.modalController.create({
  //       component: EmailwriteComponent,
  //       componentProps: { value: 'sd' } // 传值
  //     });
  //     return await modal.present();
  //   }
  
  //跳转到写信页面
  addEmail(){
    // this.router.navigate(['/emailwrite/',this.user_Id]);
    this.router.navigate(['/emailwrite/',1]);
  }

  //搜索用户收到的邮件
  getUserEmailList(){
    this.emailList2 = [];
    this.emaildetail = [];
    this.emailList = [];
    // this.getHistory();
    var api = '/api/Message/GetReceiveMessage?authtoken='+this.authtoken+'&userId='+this.user_Id;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        //获取该用户收到的信件赋值给emailList2
        this.emailList2 = response.info;  
        console.log(this.emailList2);
        //循环一遍将用户ID和文件ID存入
        this.emailList2.forEach((element,index) => { 
          this.emaildetail.push({"realName":element.sender,"isReaded":element.id}); 
          this.emailList.push({"id":element.id,"realName":"",sender:element.sender,"isReaded":"",
                 subject:element.subject,body:element.body,isImportant:element.isImportant,
                 sendTime:element.sendTime,isDel:element.isDel,isRecycle:element.isRecycle});
        });
        //遍历emaildetail将发信人id替换成真实姓名
        this.emaildetail.forEach((element,index) => {
          var api2 = '/api/Users/GetStudent?authtoken='+this.authtoken +'&id='+element.realName;
          this.commonService.get(api2).then((response2: any) => {
            if (response2.retcode == 0) {
                element.realName = response2.info.realName;
                this.emailList[index].realName = response2.info.realName;
            } else {
              this.toastTip('参数错误','danger');
              return;
            }
          });
        });
        //遍历emaildetail将信件的id替换成信件是否已读信息
        this.emaildetail.forEach((element,index) => {
          var api3 = '/api/Message/GetMessageReceiveById?authtoken='+this.authtoken +'&id='+element.isReaded;
          this.commonService.get(api3).then((response3: any) => {
            if (response3.retcode == 0) {
                element.isReaded = response3.info.isReaded;
                this.emailList[index].isReaded = response3.info.isReaded;
                this.emailList[index].sendTime = this.emailList[index].sendTime.substring(0,16);
                this.emailList[index].sendTime = this.emailList[index].sendTime.replace('T',' ');
            } else {
              this.toastTip('参数错误','danger');
              return;
            }
          });
        });
        console.log(this.emaildetail);
        console.log(this.emailList);
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });

  }

  // 将该邮件改为重要邮件
  beImportant(ids:any){  
    console.log(ids + '标星');
    var api = '/api/Message/MessageImportant?authtoken='+this.authtoken +'&id='+ids;
    this.commonService.get(api).then((response: any) => {
      if (response.retcode == 0) {
        this.toastTip('该邮件成功设为重要文件','success');
        this.getUserEmailList();
      } else {
        this.toastTip('参数错误','danger');
        return;
      }
    });
  }
  //将邮件改为不重要邮件
  beNoImportant(ids:any){
    console.log(ids + '取消标星');
    var api = '/api/Message/MessageNoImportant?authtoken='+this.authtoken +'&id='+ids;
          this.commonService.get(api).then((response: any) => {
            if (response.retcode == 0) {
              this.toastTip('该邮件不再是重要文件','success');
              this.getUserEmailList();
            } else {
              this.toastTip('参数错误','danger');
              return;
            }
          });
  }

  //点击进入查看邮件
  checkEmail(id:any){
    console.log('查看邮件'+id);
    this.router.navigate(['/showemail/', id]);
  }

  // 长按触发删除邮件事件
  async delete(id: any) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要删除吗!',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消删除');//这里是否还需要加一个刷新页面的功能？
          }
        }, {
          text: '确定',
          handler: () => {
            this.deleteEmail(id);
          }
        }
      ]
    });
    await alert.present();
  }

  //自定义邮件删除函数
  deleteEmail(ids:any){
    console.log(ids + '确认删除');
    var api = '/api/Message/DeleteMessagetoRecycle?authtoken='+this.authtoken +'&id='+ids;
          this.commonService.get(api).then((response: any) => {
            if (response.retcode == 0) {
              console.log("delete success"+ids);
              this.toastTip('该邮件已放入回收站','success');
              this.getUserEmailList();
            } else {
              this.toastTip('参数错误','danger');
              return;
            }
          });
  }
  // 返回上一层
  goBack() {
    this.router.navigate(['/tabs/tab2/']);
  }
  // 获得焦点
  focusInput() {
     this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // console.log('失去焦点');
    // this.flag = !this.flag;
  }
  // 获取历史记录
  getHistory() {
    const historyList = this.storageService.get('historylist2');
    if (historyList) {
      this.historyList = historyList;
    }
  }
  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.keywords = keywords;
    this.doSearch();
  }
  // 点击搜索按钮执行搜索
  doSearch() {
    this.saveHistory();  // 保存搜索关键词
    this.flag = false;
  }

  // 保存历史记录
  saveHistory() {
    /*
    1、获取本地存储里面的历史记录数据
    2、判断本地存储的历史记录是否存在
    3、存在：把新的历史记录和以前的历史记录拼接 ,然后重新保存 （去重）
    4、不存在：直接把新的历史记录保存到本地
    */
    this.commonService.saveLocalStorage('historylist2', this.keywords);
  }
  // 删除历史记录
  async removeHistory(key) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示！',
      message: '要删除此条记录吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
              console.log('Cancel');//
          }
        }, {
          text: '删除',
          handler: () => {
            // console.log('Confirm 执行删除'+key);
            this.historyList.splice(key, 1);
            this.storageService.set('historylist2', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
    // 删除全部历史记录
    deleteHistory(historyList) {
      this.historyList.splice(historyList, historyList.length);
      this.storageService.set('historylist2', this.historyList);
      // 关闭历史记录栏
      this.flag = !this.flag;
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


}
