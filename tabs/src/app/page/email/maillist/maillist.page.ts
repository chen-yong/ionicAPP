import { Component, OnInit ,ElementRef ,ViewChild, ViewChildren} from '@angular/core';
import { Router } from '@angular/router'; // 路由

import { transliterate as tr, slugify } from 'transliteration'; //汉字转化为字母的插件

import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NavController, NavParams } from '@ionic/angular';
import { IonContent } from '@ionic/angular';  //插入滚动组件，在ionic3时为Content

import { AlertController } from '@ionic/angular';//历史记录功能需要
import { CommonService } from '../../../services/common.service';  
import { StorageService } from '../../../services/storage.service';
import { element } from 'protractor';

@Component({
  selector: 'app-maillist',
  templateUrl: './maillist.page.html',
  styleUrls: ['./maillist.page.scss'],
})
export class MaillistPage implements OnInit {

  // @ViewChild(Content,{static:true}) content: Content;
  @ViewChildren('IonItemGroup1') ionItemGroup1;
  @ViewChild(IonContent,{static:true}) content:IonContent;

  scrollToTop(){
    this.content.scrollToTop();
  }

  constructor(
    public router: Router,
    private sanitizer: DomSanitizer,
    public navCtrl:NavController,
    public ref:ChangeDetectorRef,
    public alertController: AlertController,
    public storage: StorageService,
    public commonService: CommonService,
    public elementRef:ElementRef
  ) { }
 
  //将数据库中的通讯录信息获取下来复制给这个变量
  public tongxunluList:any[]=[ 
    {id:1201,kind:'任课老师',name:'张三',image:'../assets/img/hznu.png'},
    {id:1202,kind:'系统管理员',name:'李四',image:'../assets/img/hznu.png'},
    {id:1203,kind:'任课老师',name:'王武',image:'../assets/img/hznu.png'},
    {id:1204,kind:'学生',name:'阿四',image:'../assets/img/hznu.png'},
    {id:1205,kind:'学生',name:'布鲁',image:'../assets/img/hznu.png'},
    {id:1206,kind:'学生',name:'陈莉',image:'../assets/img/hznu.png'},
    {id:1207,kind:'学生',name:'梦泽',image:'../assets/img/hznu.png'},
    {id:1208,kind:'任课老师',name:'=王文',image:'../assets/img/hznu.png'},
    {id:1209,kind:'任课老师',name:'王好汉',image:'../assets/img/hznu.png'},
    {id:1210,kind:'系统管理员',name:'胡娜',image:'../assets/img/hznu.png'},
    {id:1211,kind:'任课老师',name:'query',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'文章',image:'../assets/img/hznu.png'},
    {id:1213,kind:'任课老师',name:'谢家局',image:'../assets/img/hznu.png'},
    {id:1214,kind:'任课老师',name:'依依',image:'../assets/img/hznu.png'},
    {id:1215,kind:'任课老师',name:'大业',image:'../assets/img/hznu.png'},
    {id:1216,kind:'任课老师',name:'饿e',image:'../assets/img/hznu.png'},
    {id:1217,kind:'任课老师',name:'#boby',image:'../assets/img/hznu.png'}
  ]

  public fuzhi:any[]=[];   //循环tongxunluList数组，根据名字收集某一姓氏得人 
  public fuzhi2:any[]=[];  //收集姓氏不可归类的人#
  public fuzhi2flag = false; //首字母是否可归类判断符号#
  public existname:any[]=[]; //用于存放第一次遍历字母时已经归类掉的名字的数组
  public isqita = false; //用于记录是否含有归类进#的名字
 
  public flag = false;     //历史查询记录状态
  public historyList: any[] = [];  //历史记录

  public searchInput:string='';//搜索的关键字
  public aLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'
              ,'O','P','Q','R','S','T','U','V','W','X','Y','Z']; //其他没有匹配到的全部放进'#'里面,初始化后再将#加入数组中
  public letters = [];    //通过接口获取的列表中含有的字母与26个字母对比后公共的字母（最终显示在右侧的字母）,#不放入其中，用isqita来标记是否存在#
  public formatContacts:any=[];  //按首字母顺序格式化后的通讯录
  public searchingItems = [];    //搜索显示的数组
  public searchLetters = [];     //存储搜索到的名字存在的首字母
  public isSearching = false;    //查找状态开关

  public  index:string ='A';       //当前选中的字母
  public showModal:any = false;    //字母点击光亮效果显示开关
  
  ngOnInit() {
    //循环遍历通讯录将名字按首字母重新排位，对数据库中拿出来的信息进行预处理
    this.aLetters.forEach((res,index)=>{  //循环遍历26个字母
      // this.letters.push(res);
      this.tongxunluList.forEach(element => { 
        if(tr(element.name).toLocaleUpperCase().charAt(0)==res){
           this.fuzhi.push(element);
           this.existname.push(element);//将名字已经归类的项存入数列existname中
        }
      });
      this.formatContacts.push(this.fuzhi);
      ////循环遍历过程中得到通讯录中存在的首字母
      if(this.fuzhi.length>0){
         this.letters.push(res);
      }
      this.fuzhi=[];
    })

    this.aLetters.push('#');//将‘#’加入数组aLetters里面
    //处理“#”中的名字，将上面遍历完后存入的数列与原始数列对比来查找未归类的名字，并将其放入#类中
    this.tongxunluList.forEach(element1=>{
       this.existname.forEach(element2=>{
         if(element1.name == element2.name){  //如果相等，则该姓名已经归类过了
            this.fuzhi2flag = true;   //当为true时，表示姓名已归类，不需考虑放入#
         }
       });
       if(this.fuzhi2flag == false){  //存在未归类进首字母为26字母的名字
         this.fuzhi2.push(element1);  //将这个未归类的名字暂时存入fuzhi2数组中
         this.isqita = true;          //标记存在不正常类名字，及#存在
       }
       this.fuzhi2flag = false;
    });
    this.formatContacts.push(this.fuzhi2);

    // 获取搜素历史
    this.getHistory();
  }

  //生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
      // 获取搜素历史
      this.getHistory();
    }

//定位查找首字母对应的通讯录，此处#不可定位
 selectIndex(letter){
   this.index =letter;    //将检索中点击的字母赋值给当年选中的值
   let scrollTop = this.elementRef.nativeElement.querySelector("ion-item-divider#"+letter).offsetTop;
   this.content.scrollToPoint(0,scrollTop,300); //滑动到对应的位置
   this.createModal();   //将右侧检索中点击的字母在页面中显示
 }

 //点击右侧检索后，页面显示点击字母的光亮效果功能实现
 public timeout:any;
 createModal(){
   clearTimeout(this.timeout);
   this.showModal = true;  
   this.timeout = setTimeout(()=>{
     this.showModal = false;
     this.ref.detectChanges();
   },800)
 }

  // //通过关键字查询搜索的结果值，根据键盘来查询
  // goSearchResult(ev:any){
  //   console.log(ev);
  //   this.isSearching = true;
  //   let val = ev.detail.data;
  //   console.log(val);
  //   this.searchInput = val;
  //   if(val && val.trim()!=''){
  //     this.searchLetters=[];   //将存储搜索内容首字母的数组置为空
  //     this.searchingItems=[];  //将存储搜索内容的数组置为空
  //     this.letters.forEach((res,index)=>{
  //       let search = this.formatContacts[index].filter((item)=>{
  //         return (item.name.indexOf(val)>-1);
  //       })
  //       if(search != null && search.length>0){
  //         this.searchLetters.push(res);
  //         this.searchingItems.push(search);
  //       }
  //     })
  //   }else{
  //     this.isSearching = false;
  //   }
  // }

  //通过关键字查询搜索的结果值  根据赋值来查询
  goSearchResult(){
    this.saveHistory();  // 保存搜索关键词
    this.flag = false;   // 历史记录栏隐藏
    this.isSearching = true;    // 显示通讯录搜索结果
    let val = this.searchInput; //将要搜寻的姓名赋值给val
    if(val && val.trim()!=''){
      this.searchLetters=[];   //将存储搜索内容首字母的数组置为空
      this.searchingItems=[];  //将存储搜索内容的数组置为空
      this.aLetters.forEach((res,index)=>{
        let search = this.formatContacts[index].filter((item)=>{
          return (item.name.indexOf(val)>-1);
        })
        if(search != null && search.length>0){
          this.searchLetters.push(res);
          this.searchingItems.push(search);
        }
      })
    }
    else{
      this.isSearching = false;
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

  // 返回上一层
  goBack() {
    this.router.navigate(['/tabs/tab2/']);
    this.isSearching = false;
  }

  // 获取历史记录
  getHistory() {
    const historyList = this.storage.get('historylist3');
    if (historyList) {
      this.historyList = historyList;
    }
  }
  // 点击历史记录 进行搜索
  goSearch(keywords) {
    this.searchInput = keywords;
    this.goSearchResult();
  }

  // 保存历史记录
  saveHistory() {
    /*
    1、获取本地存储里面的历史记录数据
    2、判断本地存储的历史记录是否存在
    3、存在：把新的历史记录和以前的历史记录拼接 ,然后重新保存 （去重）
    4、不存在：直接把新的历史记录保存到本地
    */
    this.commonService.saveLocalStorage('historylist3', this.searchInput);
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
            this.storage.set('historylist3', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
    // 删除全部历史记录
    deleteHistory(historyList) {
      this.historyList.splice(historyList, historyList.length);
      this.storage.set('historylist3', this.historyList);
      // 关闭历史记录栏
      this.flag = !this.flag;
    }
    
    //点击姓名给对应的人写邮件
    sendemail(id){
      this.router.navigate(['/emailwrite/',id]);
      console.log(id);
    }

    //添加通讯录联系人
    addlianxiren(){
      console.log("添加联系人，是一个个添加还是打包添加呢？")
    }
}
