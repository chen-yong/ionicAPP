import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrawplotsListPage } from './drawplots-list.page';

const routes: Routes = [
  {
    path: '',
    component: DrawplotsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DrawplotsListPage]
})
export class DrawplotsListPageModule {}
