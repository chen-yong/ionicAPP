import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public router: Router,
  ) { }

  public userInfo:any={
     id:'2014211911',
     username:"admin" 
  }

  ngOnInit(): void {

  }

  writeEmail(){
    console.log('write');
    this.router.navigate(['/emailwrite/',123]);
  }

}
