import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public navController: NavController,
    public location: Location,
    public alertController: AlertController,
    public storage: StorageService
  ) { }
  
  public iskong=false;  //判断是否收到邮件
  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any[] = [];  // 历史记录
  public emailList: any[] = [
    { id: 1, sender_name: '张三0', theme: '打印', sender_img: '../assets/img/hznu.png', text: '老哥，帮我打印一份，谢啦', flag: false},
    { id: 2, sender_name: '李四1', theme: '开题报告', sender_img: '../assets/img/index.svg', text: '你这开题怎么弄得呀？我这不行啊，评委老师说不符合要求呢，说做的太简单了', flag: false },
    { id: 3, sender_name: '王五2', theme: '第三套卷', sender_img: '../assets/img/hznu.png', text: '大神求教怎么做，小弟求教育啊！！！' , flag: false},
    { id: 4, sender_name: '赵六3', theme: '课程表', sender_img: '../assets/img/hznu.png', text: '来一份课程表，我的那个不行了', flag: false },
    { id: 5, sender_name: '陈七4', theme: '图书馆去吗？', sender_img: '../assets/img/hznu.png', text: '图书馆去吗？我对象闺蜜也去呢，以后别说兄弟没照顾你哦！', flag: false }
  ];
  public user_Id: string;

  ngOnInit(): void {
    // 获取搜素历史
    this.getHistory();
    //判断是否存在收件
    if(this.emailList.length==0){
      this.iskong = true;
    }else{
      this.iskong = false;
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
    ngDoCheck() {
      // 获取搜素历史
      this.getHistory();
    }
  // 写邮件
  addEmail() {
    console.log('写邮件');
    // this.router.navigate(['/addstudent/' + courseId]);
  }
  // 搜索收到的邮件
  getEmailList() {

    this.getHistory();
  }
  // 邮件置顶(暂时设置，连接数据库后这里还需要上传数据库的；更新显示)
  puthead(id:any){  
      this.emailList.forEach(element => {
        if (element.id == id){
          element.flag=true;
          console.log('学生'+element.id+'置顶'+element.flag);
        }
      });
  }
  // 邮件取消置顶(暂时设置，后面连接数据库后这里还需要上传数据库；更新显示)
  deletehead(id:any){
    this.emailList.forEach(element => {
      if (element.id == id){
        element.flag=false;
        console.log('学生'+element.id+'取消置顶'+element.flag);
      }
    });
  }
  //点击进入查看邮件
  checkEmail(id:any){
    alert('查看邮件'+id);
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
            console.log(id + '确认删除');
            //删除方法1
            //splice(a,b);a表示开始删除的位置，b表删除的长度
            //this.emailList.splice(id-1,1);//暂时设置的删除效果，链接数据库后要改,这个按位置删除的话出现逻辑错误
            
            //删除方法2
            // for(var i=0;i<=this.emailList.length;i++){
            //   if(this.emailList[i].id == key){
            //     this.emailList.splice(i,1);
            //   } 
            // }//Cannot read property 'id' of undefined        

            //删除方法3，调用本地自定义函数
            this.deleteEmail(id);
          }
        }
      ]
    });
    await alert.present();
  }

  //自定义邮件删除函数
  deleteEmail(id:any){
     console.log("delete success");
     //这里编辑删除操作
     //判断是否存在收件
     if(this.emailList.length==0){
       this.iskong = true;
     }else{
       this.iskong = false;
     }
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
    const historyList = this.storage.get('historylist2');
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
    let historyList = this.storage.get('historylist2');
    if (historyList) { // 存在
      if (historyList.indexOf(this.keywords) === -1) {
        historyList.push(this.keywords);
      }
      this.storage.set('historylist2', historyList);
    } else {  // 不存在且非空格
      if (this.keywords.trim().length > 0) {
        historyList = [];
        historyList.push(this.keywords);
        this.storage.set('historylist2', historyList);
      }
    }
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
            this.storage.set('historylist2', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
    // 删除全部历史记录
    deleteHistory(historyList) {
      this.historyList.splice(historyList, historyList.length);
      this.storage.set('historylist2', this.historyList);
      // 关闭历史记录栏
      this.flag = !this.flag;
    }

}
