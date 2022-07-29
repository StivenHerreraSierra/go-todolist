import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-signup-form',
  templateUrl: './user-signup-form.component.html',
  styleUrls: ['./user-signup-form.component.css'],
})
export class UserSignupFormComponent implements OnInit {

  @Output() signEvent  = new EventEmitter();

  private user = {} as User;

  signupForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {}

  signUp() {
    this.user.user_first_name = this.signupForm.get('firstname')?.value || '';
    this.user.user_last_name = this.signupForm.get('lastname')?.value || '';
    this.user.user_email = this.signupForm.get('email')?.value || '';
    this.user.user_password = this.signupForm.get('password')?.value || '';

    this.signEvent.emit(this.user);
  }

  get isValid() {
    return this.signupForm.valid;
  }
}
