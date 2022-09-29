import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogPas } from 'src/app/shared/interfaces/LogPas';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Output()
  public addEvent = new EventEmitter();

  public login: string = '';
  public password: string = '';

  constructor() {}

  ngOnInit(): void {}

  onLogin() {
    if (this.login && this.password) {
      const logPas = new LogPas(this.login, this.password);
      this.addEvent.emit(logPas);
    } else {
      alert('login and password are required fields!');
    }
  }
}
