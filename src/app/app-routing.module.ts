import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthReverseGuard } from './guards/auth-reverse.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { CreateMeetupPageComponent } from './pages/create-meetup-page/create-meetup-page.component';
import { HowCreateAccPageComponent } from './pages/how-create-acc-page/how-create-acc-page.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

const routes: Routes = [
  {path: 'auth', component: AuthPageComponent, canActivate: [AuthReverseGuard]},
  {path: 'meetups', component: MeetupsPageComponent, canActivate: [AuthGuard]},
  {path: 'myMeetups', component: MyMeetupsPageComponent, canActivate: [AuthGuard]},
  {path: 'howCreateAcc', component: HowCreateAccPageComponent, canActivate: [AuthGuard]},
  {path: 'createMeetup', component: CreateMeetupPageComponent, canActivate: [AuthGuard]},
  {path: 'userList', component: UserListPageComponent, canActivate: [AuthGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
  providers: [AuthGuard, AdminGuard, AuthReverseGuard]
})
export class AppRoutingModule { }
