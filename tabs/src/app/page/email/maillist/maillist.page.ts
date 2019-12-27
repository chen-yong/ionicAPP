import { Component, OnInit ,ElementRef ,ViewChild, ViewChildren} from '@angular/core';
import { Router } from '@angular/router'; // 路由

import { transliterate as tr, slugify } from 'transliteration'; //汉字转化为字母的插件

import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NavController, NavParams } from '@ionic/angular';
import { IonContent } from '@ionic/angular';  //插入滚动组件，在ionic3时为Content

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
    // public navParams:NavParams,
    public elementRef:ElementRef
  ) { }
 
  //将数据库中的通讯录信息获取下来复制给这个变量
  public tongxunluList:any[]=[ 
    {id:1201,kind:'任课老师',name:'张三',image:'../assets/img/hznu.png'},
    {id:1202,kind:'系统管理员',name:'李四',image:'../assets/img/hznu.png'},
    {id:1203,kind:'任课老师',name:'王武',image:'../assets/img/hznu.png'},
    {id:1208,kind:'任课老师',name:'王文',image:'../assets/img/hznu.png'},
    {id:1209,kind:'任课老师',name:'王好汉',image:'../assets/img/hznu.png'},
    {id:1204,kind:'学生',name:'阿四',image:'../assets/img/hznu.png'},
    {id:1205,kind:'学生',name:'布鲁',image:'../assets/img/hznu.png'},
    {id:1206,kind:'学生',name:'陈莉',image:'../assets/img/hznu.png'},
    {id:1207,kind:'学生',name:'梦泽',image:'../assets/img/hznu.png'},
    {id:1210,kind:'系统管理员',name:'胡娜',image:'../assets/img/hznu.png'},
    {id:1211,kind:'任课老师',name:'query',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'叶佳妮',image:'../assets/img/hznu.png'},
    {id:1213,kind:'任课老师',name:'文章',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'叶难',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'谢家局',image:'../assets/img/hznu.png'},
    {id:1212,kind:'任课老师',name:'依依',image:'../assets/img/hznu.png'},
    {id:1214,kind:'任课老师',name:'大业',image:'../assets/img/hznu.png'},
    {id:1215,kind:'任课老师',name:'饿',image:'../assets/img/hznu.png'}
  ]

  public fuzhi:any[]=[];   //循环tongxunluList数组，根据名字收集某一姓氏得人 
  public flag = false;     //历史查询记录状态

  public searchInput:string;//搜索的关键字
  public aLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'
              ,'O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public letters = [];    //通过接口获取的列表中含有的字母与26个字母对比后公共的字母（最终显示在右侧的字母）
  public formatContacts:any=[];  //按首字母顺序格式化后的通讯录
  public searchingItems = [];    //搜索显示的数组
  public searchLetters = [];     //存储搜索到的名字存在的首字母
  public isSearching = false;    //查找状态开关

  public  index:string ='A';     //当前选中的字母
  public showModal:any = false;  //字母点击光亮效果显示开关
  
  ngOnInit() {
    //循环遍历通讯录将名字按首字母重新排位，对数据库中拿出来的信息进行预处理
    this.aLetters.forEach((res,index)=>{  //循环遍历26个字母
      // this.letters.push(res);
      this.tongxunluList.forEach(element => { 
        if(tr(element.name).toLocaleUpperCase().charAt(0)==res){
           this.fuzhi.push(element);
        }
      });
      this.formatContacts.push(this.fuzhi);
      ////循环遍历过程中得到通讯录中存在的首字母
      if(this.fuzhi.length>0){
         this.letters.push(res);
      }
      this.fuzhi=[];
    })
  }

//定位查找首字母对应的通讯录
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
    this.isSearching = true;
    let val = this.searchInput;
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
    }else{
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


}
