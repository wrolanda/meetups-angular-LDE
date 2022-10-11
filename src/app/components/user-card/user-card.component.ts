import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  updateUserForm!: FormGroup;

  @Input()
  user!: User;

  @Output()
  public addEventDelUser = new EventEmitter();
  @Output()
  public addEventUpdUser = new EventEmitter();
  
  isChange = false;
  changeable() {
    this.updateUserForm.controls['email'].enable();
    this.updateUserForm.controls['password'].enable();
    this.updateUserForm.controls['fio'].enable();
    this.updateUserForm.controls['role'].enable();
    
    this.isChange = true;
  }

  cancel() {
    this.unchangeable();
    this.updateUserForm.setValue({
      email: this.user.email,
      password: this.user.password,
      fio: this.user.fio,
      role: this.user.roles[0].name,
    });
  }

  unchangeable() {
    this.updateUserForm.controls['email'].disable();
    this.updateUserForm.controls['password'].disable();
    this.updateUserForm.controls['fio'].disable();
    this.updateUserForm.controls['role'].disable();
    this.isChange = false;
  }

  constructor(
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.initUpdateUserForm();  
    this.unchangeable();
  }

 
  initUpdateUserForm() {
      this.updateUserForm = this.fb.group({
        email: [`${this.user.email}`, [Validators.required, Validators.email]],
        password: [`${this.user.password}`, [Validators.required]],
        fio: [`${this.user.fio}`, [Validators.required]],
        role: [`${this.showRole()}`, [Validators.required]],
      });
    }

  deleteUser() {
    const result = confirm("вы уверены?");
    if (result) {
      this.addEventDelUser.emit(this.user.id);
    }
  }

  showRole(): string {
    let arrayRoles = this.user.roles;
    for (let i = 0; i < arrayRoles.length; i++) {
      if (arrayRoles[i].name === "ADMIN")
        return "ADMIN";
    }
    return "USER";
  }

  onUpdateUser() {
    let password = '';
    if (this.updateUserForm.value.password !== this.user.password)
      password = this.updateUserForm.value.password;

    const updateUserObj = {
      id: this.user.id,
      email: this.updateUserForm.value.email,
      password: password,
      fio: this.updateUserForm.value.fio,
      roles: [{name: this.updateUserForm.value.role}],
    }
    console.log(updateUserObj);
    this.addEventUpdUser.emit(updateUserObj);
  }

}
