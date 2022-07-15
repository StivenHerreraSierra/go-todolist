import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signup-form',
  templateUrl: './user-signup-form.component.html',
  styleUrls: ['./user-signup-form.component.css']
})
export class UserSignupFormComponent implements OnInit {

  signupForm: FormGroup = this.formBuilder.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    }
  );

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  
  signUp() {
    console.log(this.signupForm.value);
  }

}
