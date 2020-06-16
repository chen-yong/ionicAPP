import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExerciseStuPage } from './exercise-stu.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseStuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExerciseStuPage]
})
export class ExerciseStuPageModule {}
