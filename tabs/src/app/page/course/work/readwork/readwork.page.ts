import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readwork',
  templateUrl: './readwork.page.html',
  styleUrls: ['./readwork.page.scss'],
})
export class ReadworkPage implements OnInit {
  public courseId;
  public headline = '作业批阅';
  public option = 'false';

  constructor(
    public router: Router,
    ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(10);
  }
   // 返回上一层
   goBack(courseId) {
    this.router.navigate(['/work/' + courseId]);
  }
  segmentChanged(ev: any) {
    console.log(ev);
  }

}
