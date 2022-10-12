import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LogPas } from 'src/app/shared/interfaces/LogPas';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authReactiveForm!: FormGroup<{
    login: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  @Output()
  public addEvent = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm() {
    this.authReactiveForm = this.fb.group({
      login: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (
      this.authReactiveForm.value.login &&
      this.authReactiveForm.value.password
    ) {
      const logPas = new LogPas(
        this.authReactiveForm.value.login,
        this.authReactiveForm.value.password
      );
      this.addEvent.emit(logPas);
    }
  }
}
