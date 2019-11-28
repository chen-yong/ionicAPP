import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
