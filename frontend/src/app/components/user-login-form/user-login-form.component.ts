import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Credentials} from 'src/app/models/credentials';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  @Output() loginEvent = new EventEmitter();

  userCredentials: Credentials = {} as Credentials;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    this.userCredentials.user_email = this.loginForm.get('email')?.value || '';
    this.userCredentials.user_password = this.loginForm.get('password')?.value || '';

    this.loginEvent.emit(this.userCredentials);
  }

  get isValid(): boolean {
    return this.loginForm.valid;
  }
}
