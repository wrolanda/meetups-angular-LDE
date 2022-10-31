import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  subscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(LogPas: { email: string; password: string }) {
    this.subscription = this.authService
      .login(LogPas.email, LogPas.password)
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
