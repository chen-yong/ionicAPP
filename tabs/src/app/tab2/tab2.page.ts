import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(

  ) { }

  public userInfo:any={
     id:'2014211911',
     username:"admin" 
  }

  ngOnInit(): void {

  }

  addEmail(){
    console.log('write');
  }

}
