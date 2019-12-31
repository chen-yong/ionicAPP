import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmailwritePage } from './emailwrite.page';
import { AddpeopleComponent } from '../components/addpeople/addpeople.component';

const routes: Routes = [
  {
    path: '',
    component: EmailwritePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmailwritePage,AddpeopleComponent],
  entryComponents: [AddpeopleComponent]
})
export class EmailwritePageModule {}
