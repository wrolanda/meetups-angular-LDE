import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss'],
  providers: [UsersService],
})
export class CreateNewUserComponent implements OnInit {
  createUserForm!: FormGroup;
  sub?: Subscription;

  @Output()
  public addEvent = new EventEmitter();

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fio: ['', [Validators.required]],
    });
  }

  onCreateUser() {
    console.log('крутилка');
    if (
      this.createUserForm.value.email &&
      this.createUserForm.value.password &&
      this.createUserForm.value.fio
    ) {
      const userData: IUser = {
        email: this.createUserForm.value.email,
        password: this.createUserForm.value.password,
        fio: this.createUserForm.value.fio,
      };
      this.sub = this.userService.createUser(userData).subscribe(() => {
        console.log('крутилка кончилась');
        return (data: IUser) => console.log(data);
      });
    } else {
      alert('заполни все поля!');
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
