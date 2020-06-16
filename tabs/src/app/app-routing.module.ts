import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './services/login.guard'; // 引入路由守卫

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [LoginGuard]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }, // 设置login入口
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'manage/:id', loadChildren: './page/course/manage/manage.module#ManagePageModule' },
  { path: 'userinfo/:id', loadChildren: './page/me/userinfo/userinfo.module#UserinfoPageModule' },
  { path: 'student/:id', loadChildren: './page/course/student/student.module#StudentPageModule' },
  { path: 'work/:id', loadChildren: './page/course/work/work.module#WorkPageModule' },
  { path: 'addwork/:id', loadChildren: './page/course/work/addwork/addwork.module#AddworkPageModule' },
  { path: 'readwork/:id', loadChildren: './page/course/work/readwork/readwork.module#ReadworkPageModule' },
  { path: 'editwork/:id', loadChildren: './page/course/work/editwork/editwork.module#EditworkPageModule' },
  { path: 'workgrade/:id', loadChildren: './page/course/work/workgrade/workgrade.module#WorkgradePageModule' },
  { path: 'addstudent/:id', loadChildren: './page/course/student/addstudent/addstudent.module#AddstudentPageModule' },
  { path: 'card', loadChildren: './page/me/card/card.module#CardPageModule' },
  { path: 'password/:id', loadChildren: './page/me/password/password.module#PasswordPageModule' },
  { path: 'setting', loadChildren: './page/me/setting/setting.module#SettingPageModule' },
  { path: 'lab/:id', loadChildren: './page/course/lab/lab.module#LabPageModule' },
  { path: 'labgrade/:id', loadChildren: './page/course/lab/labgrade/labgrade.module#LabgradePageModule' },
  { path: 'addlab/:id', loadChildren: './page/course/lab/addlab/addlab.module#AddlabPageModule' },
  { path: 'editlab/:id', loadChildren: './page/course/lab/editlab/editlab.module#EditlabPageModule' },
  { path: 'readlab/:id', loadChildren: './page/course/lab/readlab/readlab.module#ReadlabPageModule' },
  { path: 'exercise/:id', loadChildren: './page/course/exercise/exercise.module#ExercisePageModule' },
  { path: 'addexercise/:id', loadChildren: './page/course/exercise/addexercise/addexercise.module#AddexercisePageModule' },
  { path: 'editexercise/:id', loadChildren: './page/course/exercise/editexercise/editexercise.module#EditexercisePageModule' },
  { path: 'readexercise/:id', loadChildren: './page/course/exercise/readexercise/readexercise.module#ReadexercisePageModule' },
  { path: 'print/:id', loadChildren: './page/course/print/print.module#PrintPageModule' },
  { path: 'addprint/:id', loadChildren: './page/course/print/addprint/addprint.module#AddprintPageModule' },
  { path: 'grades/:id', loadChildren: './page/course/grades/grades.module#GradesPageModule' },
  { path: 'testgrade/:id', loadChildren: './page/course/testgrade/testgrade.module#TestgradePageModule' },
  { path: 'inbox/:id', loadChildren: './page/email/inbox/inbox.module#InboxPageModule' },
  { path: 'outbox/:id', loadChildren: './page/email/outbox/outbox.module#OutboxPageModule' },
  { path: 'dustbin/:id', loadChildren: './page/email/dustbin/dustbin.module#DustbinPageModule' },
  { path: 'maillist', loadChildren: './page/email/maillist/maillist.module#MaillistPageModule' },
  { path: 'resource/:id', loadChildren: './page/course/resource/resource.module#ResourcePageModule' },
  { path: 'emailwrite/:id', loadChildren: './page/email/emailwrite/emailwrite.module#EmailwritePageModule' },
  { path: 'editstudent/:id', loadChildren: './page/course/student/editstudent/editstudent.module#EditstudentPageModule' },
  { path: 'showemail/:id', loadChildren: './page/email/showemail/showemail.module#ShowemailPageModule' },
  { path: 'writeback/:id', loadChildren: './page/email/writeback/writeback.module#WritebackPageModule' },
  { path: 'manage-stu/:id', loadChildren: './page/course_student/manage-stu/manage-stu.module#ManageStuPageModule' },
  { path: 'lab-stu/:id', loadChildren: './page/course_student/lab-stu/lab-stu.module#LabStuPageModule' },
  { path: 'exercise-stu/:id', loadChildren: './page/course_student/exercise-stu/exercise-stu.module#ExerciseStuPageModule' },
  { path: 'grades-stu/:id', loadChildren: './page/course_student/grades-stu/grades-stu.module#GradesStuPageModule' },
  { path: 'resource-stu/:id', loadChildren: './page/course_student/resource-stu/resource-stu.module#ResourceStuPageModule' },
  { path: 'work-stu/:id', loadChildren: './page/course_student/work-stu/work-stu.module#WorkStuPageModule' }

















];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
