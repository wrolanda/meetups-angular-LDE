import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { EditMeetupComponent } from './components/edit-meetup/edit-meetup.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthReverseGuard } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { CreateMeetupPage2Component } from './pages/create-meetup-page2/create-meetup-page2.component';
import { HowCreateAccPageComponent } from './pages/how-create-acc-page/how-create-acc-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

const routes: Routes = [
  {path: '', redirectTo: "auth", pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent, canActivate: [AuthReverseGuard]},
  {path: 'meetups', component: MeetupsPageComponent, canActivate: [AuthGuard]},
  {path: 'myMeetups', component: MyMeetupsPageComponent, canActivate: [AuthGuard]},
  {path: 'howCreateAcc', component: HowCreateAccPageComponent},
  {path: 'createMeetup', component: CreateMeetupPage2Component, canActivate: [AuthGuard]},
  {path: 'userList', component: UserListPageComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'createUser', component: CreateNewUserComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'editMeetup', component: EditMeetupComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuard, AdminGuard, AuthReverseGuard]
})
export class AppRoutingModule { }
