import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-testgrade',
  templateUrl: './testgrade.page.html',
  styleUrls: ['./testgrade.page.scss'],
})
export class TestgradePage implements OnInit {
  public leftList: any[] = [];
  public rightList: any[] = [];
  public selectedId: any = '';  /*选中的学生id*/
  constructor(
    public router: Router,
  ) {
    for (let i = 0; i < 15; i++) {
      this.leftList.push(`学生${i}`);
    }
  }
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.leftList.push(`学生${15 + i}`);
      }
      // 告诉ion-infinite-scroll数据已经更新，调用complete方法实现无限更新
      event.target.complete();
      // 数据最大时禁用更新
      if (this.leftList.length > 50) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/manage/1']);
  }

}
