import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {
  @Input() headline: string;
  @Input() goBack: any;

  constructor(
    public nav: NavController,
    public router: Router,
  ) { }

  ngOnInit() { }
  // 返回上一页
  onLeftClick() {
    console.log('onLeftClick');
    this.goBack();
  }

}
