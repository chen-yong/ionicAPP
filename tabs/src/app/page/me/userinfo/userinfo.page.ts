import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  public id = '';
  public PeopleList:any={
    id: 5,
    name: 'Admin',
    img: 'assets/img/hznu.png',
    color: 'success',
    intro: '扬帆起航，就此远航'
  }

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // 接收传值
    this.route.params.subscribe(data => {
      console.log('接收到ID：'+data.id);
      this.id = data.id;
    });
  }
  

}
