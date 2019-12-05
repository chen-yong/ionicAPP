import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackComponent } from './back.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';



@NgModule({
  declarations: [BackComponent],
  imports: [
    CommonModule,
    NgZorroAntdMobileModule,
    IonicModule,
    RouterModule,
  ],
  exports: [BackComponent]
})
export class BackModule { }
