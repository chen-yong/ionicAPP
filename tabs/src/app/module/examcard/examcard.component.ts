import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examcard',
  templateUrl: './examcard.component.html',
  styleUrls: ['./examcard.component.scss'],
})
export class ExamcardComponent implements OnInit {
  thumbStyle = {
    width: '32px',
    height: '32px'
  };

  constructor() { }

  ngOnInit() {}

}
