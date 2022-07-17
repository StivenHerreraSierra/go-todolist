import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  
  signUp() {
    this.userService.signUp({
      user_first_name: this.signupForm.get("firstname")?.value || "",
      user_last_name: this.signupForm.get("lastname")?.value || "",
      user_email: this.signupForm.get("email")?.value || "",
      user_password: this.signupForm.get("password")?.value || ""
    }).subscribe(res => console.log(res));
  }

}
