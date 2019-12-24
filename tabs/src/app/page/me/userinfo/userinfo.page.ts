import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

//图片头像拍照
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';  // 提示弹出层

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  public id = '';
  public PeopleList:any={
    id: 2014211911,
    name: 'Admin',
    img: 'assets/img/hznu.png',
    sex: '1', //这里用man为1，women为2
    number:'28865371',
    email:'1033558982@qq.com',
    address:"杭州市余杭塘路2318号",
    qq:'1033558982'

  };
  public base64Img = '';//临时存放拍照得到的照片

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
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

  }
  
  //返回上一页设置
  goBack() {
    this.router.navigate(['/tabs/tab3/']);
  }

  //保存提交设置，表单提交
  saveUserInfo(){
    console.log('姓名:'+this.PeopleList.name+'座右铭:'+this.PeopleList.intro);
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
