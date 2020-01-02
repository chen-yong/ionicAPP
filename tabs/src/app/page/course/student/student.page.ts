import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StudentinfoComponent } from './components/studentinfo/studentinfo.component';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';
import { transliterate as tr } from 'transliteration'; // 汉字转化为字母的插件
import { IonContent } from '@ionic/angular';  // 插入滚动组件，在ionic3时为Content
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  constructor(
    public location: Location,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public storage: StorageService,
    public commonService: CommonService,
    public elementRef: ElementRef,
    public ref: ChangeDetectorRef,
  ) { }
  @ViewChild(IonContent, { static: true }) content: IonContent;

  public flag = false;
  public keywords: any = '';  // 表单输入的关键词
  public historyList: any[] = [];  // 历史记录
  public studentList: any[] = [
    { id: 1, name: '董卓', src: '../../../../assets/img/index.svg' },
    { id: 2, name: '吕蒙', src: '../../../../assets/img/index.svg' },
    { id: 3, name: '曹植', src: '../../../../assets/img/index.svg' },
    { id: 4, name: '邢道荣', src: '../../../../assets/img/index.svg' },
    { id: 5, name: '庞统', src: '../../../../assets/img/index.svg' },
    { id: 6, name: '曹操', src: '../../../../assets/img/index.svg' },
    { id: 7, name: '赵云', src: '../../../../assets/img/index.svg' },
    { id: 8, name: '关羽', src: '../../../../assets/img/index.svg' },
    { id: 9, name: '郭嘉', src: '../../../../assets/img/index.svg' },
    { id: 10, name: 'A', src: '../../../../assets/img/index.svg' },
    { id: 11, name: 'B', src: '../../../../assets/img/index.svg' },
    { id: 12, name: '张飞', src: '../../../../assets/img/index.svg' },
    { id: 13, name: 'E', src: '../../../../assets/img/index.svg' },
    { id: 14, name: '11', src: '../../../../assets/img/index.svg' },
    { id: 15, name: '22', src: '../../../../assets/img/index.svg' },
    { id: 1201, name: '刘备', src: '../../../../assets/img/index.svg' },
    { id: 1202, name: '马超', src: '../../../../assets/img/index.svg' },
    { id: 1203, name: '诸葛亮', src: '../../../../assets/img/index.svg' },
    { id: 1204, name: '荀彧', src: '../../../../assets/img/index.svg' },
    { id: 1205, name: '孙权', src: '../../../../assets/img/index.svg' },
    { id: 1206, name: '周瑜', src: '../../../../assets/img/index.svg' },
    { id: 1207, name: '鲁肃', src: '../../../../assets/img/index.svg' },
    { id: 1208, name: '颜良', src: '../../../../assets/img/index.svg' },
    { id: 1209, name: '文丑', src: '../../../../assets/img/index.svg' },
    { id: 1210, name: '华佗', src: '../../../../assets/img/index.svg' },
    { id: 1211, name: '太史慈', src: '../../../../assets/img/index.svg' },
    { id: 1212, name: '吕布', src: '../../../../assets/img/index.svg' },
    { id: 1213, name: '貂蝉', src: '../../../../assets/img/index.svg' },
    { id: 1214, name: '大乔', src: '../../../../assets/img/index.svg' },
    { id: 1215, name: '小乔', src: '../../../../assets/img/index.svg' },
    { id: 1216, name: '许诸', src: '../../../../assets/img/index.svg' }
  ];
  public courseId;

  public orderList: any[] = [];   // 循环studentList数组，根据姓名首字母排序
  public aLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'
    , 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public letters = [];    // 通过接口获取的列表中含有的字母与26个字母对比后公共的字母（最终显示在右侧的字母）
  public formatContacts: any = [];  // 按首字母顺序格式化后的通讯录
  public searchingItems = [];    // 搜索显示的数组
  public searchLetters = [];     // 存储搜索到的名字存在的首字母
  public isSearching = false;    // 查找状态开关
  public index = 'A';       // 当前选中的字母
  public showModal: any = false;    // 字母点击光亮效果显示开关
  public timeout: any; // 点击右侧检索后，页面显示点击字母的光亮效果功能实现

  ngOnInit() {
    // 接收课程ID
    console.log(location.pathname);
    this.courseId = location.pathname.substring(9);
    // console.log('课程ID:' + this.courseId);
    // 根据课程ID查找所有学生列表
    // this.getStudentList();
    // 获取搜素历史
    this.getHistory();
    // 循环遍历通讯录将名字按首字母重新排位，对数据库中拿出来的信息进行预处理
    this.aLetters.forEach((res, index) => {  // 循环遍历26个字母
      this.studentList.forEach(element => {
        if (tr(element.name).toLocaleUpperCase().charAt(0) === res) {
          this.orderList.push(element);
        }
      });
      this.formatContacts.push(this.orderList);
      // 循环遍历过程中得到通讯录中存在的首字母
      if (this.orderList.length > 0) {
        this.letters.push(res);
      }
      this.orderList = [];
    });
  }

  // 定位查找首字母对应的通讯录
  selectIndex(letter) {
    this.index = letter;    // 将检索中点击的字母赋值给当年选中的值
    const scrollTop = this.elementRef.nativeElement.querySelector('ion-item-divider#' + letter).offsetTop;
    this.content.scrollToPoint(0, scrollTop, 300); // 滑动到对应的位置
    this.createModal();   // 将右侧检索中点击的字母在页面中显示
  }
  // 点击右侧字母弹出字母检索提示
  createModal() {
    clearTimeout(this.timeout);
    this.showModal = true;
    this.timeout = setTimeout(() => {
      this.showModal = false;
      this.ref.detectChanges();
    }, 800);
  }
  // tslint:disable-next-line: use-lifecycle-interface // 生命周期函数ngDoCheck检测的变化时作出反应
  ngDoCheck() {
    // 获取搜素历史
    this.getHistory();
  }
  // 返回上一层
  goBack(courseId) {
    this.router.navigate(['/manage/' + courseId]);
  }
  // 添加学生
  addStudent(courseId) {
    // console.log('添加学生');
    this.router.navigate(['/addstudent/' + courseId]);
  }
  // 编辑学生
  editStudent(courseId) {
    // console.log('添加学生');
    this.router.navigate(['/editstudent/' + courseId]);
  }
  // 搜索学生
  getStudentList() {
    this.getHistory();
  }
  // 获得焦点
  focusInput() {
    this.flag = true;
  }
  // 失去焦点
  blurInput() {
    // this.flag = !this.flag;
  }
  // 长按触发删除学生事件
  async delete(id: string) {
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
            console.log('取消删除');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log(id + '确认删除');
          }
        }
      ]
    });
    await alert.present();
  }
  // 点击事件model框显示学生信息
  async showModel(id: string) {
    const modal = await this.modalController.create({
      component: StudentinfoComponent,
      componentProps: { value: id } // 传值
    });
    return await modal.present();
  }
  // 重置密码
  async resetPwd(id: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示',
      message: '确定要重置密码？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log(id + '确认');
          }
        }
      ]
    });
    await alert.present();
  }
  // 获取历史记录
  getHistory() {
    const historyList = this.storage.get('historylist');
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
    this.commonService.saveLocalStorage('historylist', this.keywords);
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
            // console.log('Cancel');
          }
        }, {
          text: '删除',
          handler: () => {
            this.historyList.splice(key, 1);
            this.storage.set('historylist', this.historyList);
          }
        }
      ]
    });
    await alert.present();
  }
  // 删除全部历史记录
  deleteHistory(historyList) {
    this.historyList.splice(historyList, historyList.length);
    this.storage.set('historylist', this.historyList);
    // 关闭历史记录栏
    this.flag = !this.flag;
  }

}
