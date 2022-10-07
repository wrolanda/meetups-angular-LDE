import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 title = 'meetups-angular-LDE';

 constructor (
  private authService: AuthService
 ) {}

 public get isAdmin() {
  return this.authService.isAdmin;
}
}
