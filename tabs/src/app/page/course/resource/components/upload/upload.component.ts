import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
  ) { }

  ngOnInit() {}

  // 关闭模态对话框
  doClose() {
    this.navParams.data.modal.dismiss();
  }
  // 上传文件
  uploadFile() {
    console.log('上传文件');
  }

}
