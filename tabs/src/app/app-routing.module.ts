import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: './login/login.module#LoginPageModule' // 设置login入口
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'manage/:id', loadChildren: './page/course/manage/manage.module#ManagePageModule' },
  { path: 'userinfo:/id', loadChildren: './page/me/userinfo/userinfo.module#UserinfoPageModule' },
  { path: 'student/:id', loadChildren: './page/course/student/student.module#StudentPageModule' },
  { path: 'studentinfo/:id', loadChildren: './page/course/studentinfo/studentinfo.module#StudentinfoPageModule' },
  { path: 'work/:id', loadChildren: './page/course/work/work.module#WorkPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
