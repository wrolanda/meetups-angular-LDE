import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { HowCreateAccPageComponent } from './pages/how-create-acc-page/how-create-acc-page.component';
import { CreateMeetupPageComponent } from './pages/create-meetup-page/create-meetup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { MeetupCreateComponent } from './components/meetup-create/meetup-create.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { EditMeetupComponent } from './components/edit-meetup/edit-meetup.component';
import { SearchComponent } from './components/search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './pipe/filter.pipe';
import { NetworkRequestsInterceptor } from './interceptors/network-requests.interceptor';
import { EditMeetupPageComponent } from './pages/edit-meetup-page/edit-meetup-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateMeetupPage2Component } from './pages/create-meetup-page2/create-meetup-page2.component';
import { EditMeetupPage2Component } from './pages/edit-meetup-page2/edit-meetup-page2.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetupCardComponent,
    NavbarComponent,
    MeetupsComponent,
    AuthPageComponent,
    AuthComponent,
    MeetupsPageComponent,
    MyMeetupsPageComponent,
    HowCreateAccPageComponent,
    CreateMeetupPageComponent,
    UserListPageComponent,
    MeetupCreateComponent,
    UsersListComponent,
    UserCardComponent,
    CreateNewUserComponent,
    EditMeetupComponent,
    SearchComponent,
    FilterPipe,
    EditMeetupPageComponent,
    FooterComponent,
    CreateMeetupPage2Component,
    EditMeetupPage2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    AuthService,
    MeetupsPageComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkRequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
