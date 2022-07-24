import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  login() {
    this.userService.login({
      user_email: this.loginForm.get("email")?.value || "",
      user_password: this.loginForm.get("password")?.value || ""
    })
      .subscribe({
        next: res => {
          console.log(res);
	  this.authService.login();
          this.router.navigate(['/tasks']);
        },
        error: err => console.error(err)
      })
  }
  
  get isValid(): boolean {
    return this.loginForm.valid;
  }
}
