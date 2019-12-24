import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResourcePage } from './resource.page';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: ResourcePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourcePage, UploadComponent],
  entryComponents: [UploadComponent]
})
export class ResourcePageModule { }
