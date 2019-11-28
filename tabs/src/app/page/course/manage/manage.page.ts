import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  public id = '';

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log(this.route);
    // 接收传值
    this.route.params.subscribe(data => {
      console.log(data.id);
      this.id = data.id;
    });
  }
  studentList(id) {
    console.log(id);
  }

}
