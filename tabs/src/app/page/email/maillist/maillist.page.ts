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
import { ToastController } from '@ionic/angular';  // 提示弹出层

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
    public toastCtrl: ToastController,
    public ref:ChangeDetectorRef,
    public alertController: AlertController,
    public storageService: StorageService,
    public commonService: CommonService,
    public elementRef:ElementRef
  ) { }
 
  public tongxunluList:any[]=[];
  public authtoken = this.storageService.get('authtoken');
  public property00 :string = ''; //班级

  public fuzhi:any[]=[];   //循环tongxunluList数组，根据名字收集某一姓氏得人 
  public fuzhi2:any[]=[];  //收集姓氏不可归类的人#
  public fuzhi2flag = false; //首字母是否可归类判断符号#
  public existname:any[]=[]; //用于存放第一次遍历字母时已经归类掉的名字的数组
  public isqita = false; //用于记录是否含有归类进#的名字


  public searchInput:string='';//搜索的关键字
  public aLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'
              ,'O','P','Q','R','S','T','U','V','W','X','Y','Z']; //其他没有匹配到的全部放进'#'里面,初始化后再将#加入数组中
  public letters = [];    //通过接口获取的列表中含有的字母与26个字母对比后公共的字母（最终显示在右侧的字母）,#不放入其中，用isqita来标记是否存在#
  public formatContacts:any=[];  //按首字母顺序格式化后的通讯录
  public isSearching = false;    //查找状态开关

  public  index:string ='A';       //当前选中的字母
  public showModal:any = false;    //字母点击光亮效果显示开关
  
  ngOnInit() {
    this.getproperty00();

  }

  getTongxunluList(){
    this.tongxunluList = [];
    this.fuzhi2 = [];this.existname=[];this.formatContacts=[];this.letters=[];

    var api = '/api/Message/GetTongxunlu?authtoken='+this.authtoken+'&keyword='+this.searchInput+'&property00='+this.property00;
    this.commonService.get(api).then((response: any) => {
        if (response.retcode == 0) {
          response.info.forEach(element => {
            //将需要的元素读出来放入数组中
            this.tongxunluList.push({id:element.id,kind:element.userIdentity03,name:element.realName,image:element.avatar});
            // console.log("获得了所有老师的信息"+element.id,name);
          });
          this.getorder(); //将获得的通讯录排序
        } else {
          this.toastTip('参数错误','danger');
          return;
        }
    });    
  }

  //循环遍历通讯录将名字按首字母重新排位，对数据库中拿出来的信息进行预处理
  getorder(){
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

 //获取用户所在的班级，便于通讯录使用
 getproperty00(){
  var api = '/api/Users/GetUserByAuthtoken?authtoken='+this.authtoken;
  this.commonService.get(api).then((response: any) => {
    console.log(response.info);
    if (response.retcode == 0) {
      this.property00 = response.info.property00;
      console.log("用户班级:"+this.property00);
      this.getTongxunluList();
      console.log(this.tongxunluList);
    } else {
      this.toastTip('参数错误','danger');
      return;
    }
  });
 }

  //通过关键字查询搜索的结果值  根据赋值来查询
  goSearchResult(){
    //获取到新的通讯录
    this.getTongxunluList();
    if(this.searchInput){
       this.isSearching = true;    // 显示通讯录搜索结果
    }else{
      this.isSearching = false;
    }
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
    
    //点击姓名给对应的人写邮件
    sendemail(id){
      this.router.navigate(['/emailwrite/',id]);
      console.log(id);
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
