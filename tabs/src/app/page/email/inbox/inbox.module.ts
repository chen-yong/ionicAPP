import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InboxPage } from './inbox.page';
import { EmailwriteComponent } from '../components/emailwrite/emailwrite.component'
 
const routes: Routes = [
  {
    path: '',
    component: InboxPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InboxPage,EmailwriteComponent],
  entryComponents: [EmailwriteComponent]
})
export class InboxPageModule {}
