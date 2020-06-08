import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { CommonService } from '../../../services/common.service';

//图片头像拍照
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';  // 提示弹出层

import { HttpClient } from '@angular/common/http'; // 引用http
import { error } from 'util';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  public PeopleList:any={
    id: '', //学号是userNO
    userName: '未命名',
    img: 'assets/img/hznu.png',
    sex: '男',      //这里用man为1，women为2
    mobile:'未填',  //电话
    email:'未填',
    address:"未填",
    property05:'未填'  //QQ
  };  
  public submitPeopleList:any;
  public dbPeopleList: any;
  public authtoken = this.storageService.get('authtoken'); //验证令牌
  public id = '';//记录用户真正的id
  public base64Img = '';//临时存放拍照得到的照片

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public alertController: AlertController,
    public commonService: CommonService,
    public storageService: StorageService,
    public toastCtrl: ToastController,  //弹窗层效果
    public device: Device, //调用摄像机需要的
    public camera: Camera  //调用摄像机需要的

  ) { }

  ngOnInit() {
    // 接收传值
    this.route.params.subscribe(data => {
      console.log('接收到ID：'+data.id);
      this.id = data.id;
    });
    this.getUserList(); //连接API查询获得个人信息
  }

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

 getUserList() {
  const api = '/api/Users/GetStudent?authtoken='+this.authtoken+'&id='+this.id;
  this.commonService.get(api).then((response: any) => {
    if (response.retcode === 0) {
      this.dbPeopleList = response.info;
      console.log(this.dbPeopleList);
      
      // 赋值,只能在这里赋值了
      this.PeopleList.id = this.dbPeopleList.userNO;
      // this.PeopleList.username = this.dbPeopleList.username; 
      this.PeopleList.userName = this.dbPeopleList.userName;
      this.PeopleList.mobile = this.dbPeopleList.mobile;
      this.PeopleList.sex = this.dbPeopleList.sex;
      this.PeopleList.address = this.dbPeopleList.address;
      //图片功能暂不开发
      // if(!this.dbPeopleList.avatar){
      //     this.PeopleList.img = this.dbPeopleList.avatar;
      // }
      this.PeopleList.email = this.dbPeopleList.email;
      this.PeopleList.property05 = this.dbPeopleList.property05;

    } else if (response.retcode === 11) {
      this.toastTip('参数错误', 'danger');
      return;
    } else if (response.retcode === 13) {
      this.toastTip('令牌authtoken失效', 'danger');
      return;
    } else {
      this.toastTip('未知错误', 'danger');
      return;
    }
  });
}
  
  //返回上一页设置
  goBack() {
    this.router.navigate(['/tabs/tab3/']);
  }

  //保存提交设置，表单提交
  saveUserInfo(){    
    //用户名不能为空
    if (!this.PeopleList.userName) {
      this.toastTip('请填写姓名！', 'danger');
      return;
    }
    console.log(this.PeopleList);
    const api = '/api/Users/EditAdmin?authtoken='+this.authtoken+'&id='+this.id;
    this.commonService.post(api, this.PeopleList).then((response: any) => {
      // console.log(response);
      if (response.retcode == 0) {
        this.toastTip('保存成功', 'success');
        this.getUserList();
      } else {
        this.toastTip('保存失败', 'danger');
        return;
      }
    });
  }

  //头像点击效果选取
    async logo(){
      const alert = await this.alertController.create({
        message:'<Strong>选择选取头像方式</Strong>',
        buttons:[
          {
            text:'拍照',
            handler:(blah)=>{
              console.log("调用相机拍照");
              this.handleCamera();
           }
        },{
          text:'从手机相册选择',
          handler: () => {
             console.log("从搜集相册选择，但目前还未开发");
          }
        },{
          text: '取消',
          role: 'cancel',
          handler:(blah)=>{
            console.log("cancel");
         }
        }]
      });
      await alert.present();
    }

  //拍照
  handleCamera() {
    const options: CameraOptions = {
        quality: 100,   // 图片质量
        destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
        encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
        mediaType: this.camera.MediaType.PICTURE, // 媒体类型
        sourceType: this.camera.PictureSourceType.CAMERA, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
        allowEdit: true, // 允许编辑
        targetWidth: 300, // 缩放图片的宽度
        targetHeight: 300, // 缩放图片的高度
        saveToPhotoAlbum: false, // 是否保存到相册
        correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };

    this.camera.getPicture(options).then((imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.base64Img = base64Image;
    }, (err) => {
        alert(err);
    });
}


}
