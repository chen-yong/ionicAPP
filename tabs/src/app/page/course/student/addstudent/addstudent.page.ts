import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.page.html',
  styleUrls: ['./addstudent.page.scss'],
})
export class AddstudentPage implements OnInit {
  public courseId;
  public student: any = {
    number: '',
    name: '',
    college: '',
    class: '',
    gender: '',
    phone: '',
  };

  constructor(
    public location: Location,
    public router: Router,
  ) { }

  ngOnInit() {
    console.log('URl:' + location.pathname);
    this.courseId = location.pathname.substring(12);
  }
  goBack(courseId) {
    this.router.navigate(['/student/' + courseId]);
  }

}
