import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router
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
          this.router.navigate(['/']);
        },
        error: err => console.error(err)
      })
  }
}
