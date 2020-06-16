import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-stu',
  templateUrl: './manage-stu.page.html',
  styleUrls: ['./manage-stu.page.scss'],
})
export class ManageStuPage implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  public course_id :any;

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log("传值是"+data.id);
      this.course_id = data.id;
      console.log("课程id是"+this.course_id);
    });

    
  }

  goBack() {
    this.router.navigate(['/tabs/tab1/']);
  }

}
