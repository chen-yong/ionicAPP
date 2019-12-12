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
  { path: 'userinfo/:id', loadChildren: './page/me/userinfo/userinfo.module#UserinfoPageModule' },
  { path: 'student/:id', loadChildren: './page/course/student/student.module#StudentPageModule' },
  { path: 'work/:id', loadChildren: './page/course/work/work.module#WorkPageModule' },
  { path: 'addwork/:id', loadChildren: './page/course/work/addwork/addwork.module#AddworkPageModule' },
  { path: 'readwork/:id', loadChildren: './page/course/work/readwork/readwork.module#ReadworkPageModule' },
  { path: 'addstudent/:id', loadChildren: './page/course/student/addstudent/addstudent.module#AddstudentPageModule' },
  { path: 'card', loadChildren: './page/me/card/card.module#CardPageModule' },
  { path: 'password/:id', loadChildren: './page/me/password/password.module#PasswordPageModule' },
  { path: 'setting', loadChildren: './page/me/setting/setting.module#SettingPageModule' },
  { path: 'editwork/:id', loadChildren: './page/course/work/editwork/editwork.module#EditworkPageModule' },
  { path: 'lab/:id', loadChildren: './page/course/lab/lab.module#LabPageModule' },
  { path: 'exercise/:id', loadChildren: './page/course/exercise/exercise.module#ExercisePageModule' },
  { path: 'workgrade/:id', loadChildren: './page/course/work/workgrade/workgrade.module#WorkgradePageModule' },
  { path: 'labgrade/:id', loadChildren: './page/course/lab/labgrade/labgrade.module#LabgradePageModule' },
  { path: 'addlab/:id', loadChildren: './page/course/lab/addlab/addlab.module#AddlabPageModule' },
  { path: 'editlab/:id', loadChildren: './page/course/lab/editlab/editlab.module#EditlabPageModule' },
  { path: 'addexercise/:id', loadChildren: './page/course/exercise/addexercise/addexercise.module#AddexercisePageModule' },
  { path: 'print/:id', loadChildren: './page/course/print/print.module#PrintPageModule' },
  { path: 'addprint', loadChildren: './page/course/print/addprint/addprint.module#AddprintPageModule' },
  { path: 'grades/:id', loadChildren: './page/course/grades/grades.module#GradesPageModule' },
  { path: 'testgrade/:id', loadChildren: './page/course/testgrade/testgrade.module#TestgradePageModule' },







];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
