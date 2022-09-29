import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LogPas } from 'src/app/shared/interfaces/LogPas';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login(LogPas: LogPas) {
    this.authService.login(LogPas.email, LogPas.password).subscribe(console.log);
  }

}
