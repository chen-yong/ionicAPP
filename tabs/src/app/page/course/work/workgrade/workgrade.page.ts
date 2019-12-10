import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-workgrade',
  templateUrl: './workgrade.page.html',
  styleUrls: ['./workgrade.page.scss'],
})
export class WorkgradePage implements OnInit {
  grandeList: any[] = [];
  constructor(
    public router: Router,
  ) {
    for (let i = 0; i < 15; i++) {
      this.grandeList.push(`这是第${i}条数据`);
    }
  }
  loadData(event) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.grandeList.push(`这是第${i}条数据`);
      }
      // 告诉ion-infinite-scroll数据已经更新，调用complete方法实现无限更新
      event.target.complete();
      // 数据最大时禁用更新
      if (this.grandeList.length > 50) {
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
