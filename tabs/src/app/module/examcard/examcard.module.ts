import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamcardComponent } from './examcard.component';
import { IonicModule } from '@ionic/angular';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';



@NgModule({
  declarations: [ExamcardComponent],
  imports: [
    CommonModule,
    IonicModule,
    NgZorroAntdMobileModule,
  ],
  exports: [ExamcardComponent]
})
export class ExamcardModule { }
