import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadheadComponent } from './readhead.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';



@NgModule({
  declarations: [ReadheadComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgZorroAntdMobileModule,
  ],
  exports: [ReadheadComponent]
})
export class ReadheadModule { }
