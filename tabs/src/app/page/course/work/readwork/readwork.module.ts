import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule} from '@ionic/angular';

import { ReadworkPage } from './readwork.page';
import { ReadheadModule } from '../../../../module/readhead/readhead.module';
import { BackModule } from '../../../../module/back/back.module';
import { ExamcardModule } from '../../../../module/examcard/examcard.module';

const routes: Routes = [
  {
    path: '',
    component: ReadworkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadheadModule,
    BackModule,
    ExamcardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReadworkPage]
})
export class ReadworkPageModule { }
