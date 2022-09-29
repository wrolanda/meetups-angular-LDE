import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MeetupsService } from './services/meetups.service';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { MeetupsPageComponent } from './pages/meetups-page/meetups-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { HowCreateAccPageComponent } from './pages/how-create-acc-page/how-create-acc-page.component';
import { CreateMeetupPageComponent } from './pages/create-meetup-page/create-meetup-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    MeetupsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
