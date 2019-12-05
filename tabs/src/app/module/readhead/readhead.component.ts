import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readhead',
  templateUrl: './readhead.component.html',
  styleUrls: ['./readhead.component.scss'],
})
export class ReadheadComponent implements OnInit {
  @Input() headline: string;
  @Input() goBack: any;

  constructor(
    public nav: NavController,
    public router: Router,
  ) { }

  ngOnInit() {
  }
  // 选择
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
