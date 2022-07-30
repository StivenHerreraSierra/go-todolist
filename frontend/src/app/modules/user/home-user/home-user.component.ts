import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {
  $loginModal!: Observable<boolean>;
  $signUpModal!: Observable<boolean>;

  loginModalService: ModalService = new ModalService();
  signUpModalService: ModalService = new ModalService();

  openLogin = () => this.loginModalService.open();
  openSignUp = () => this.signUpModalService.open();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.$loginModal = this.loginModalService.watch();
    this.$signUpModal = this.signUpModalService.watch();
  }

  login(userCredentials: Credentials) {
    this.userService.login(userCredentials).subscribe({
      next: () => {
        this.authService.login();
        this.router.navigate(['/tasks']);
        this.toast.showSuccessfulAlert('Login Successful');
      },
      error: (err) => {
        const { error } = err;
        this.toast.showErrorAlert('Login Error', error.error);
      },
    });
  }

  signUp(user: User) {
    this.userService.signUp(user).subscribe({
      next: () => {
        this.toast.showSuccessfulAlert(
          'Sign Up Successful',
          'Now you can login.'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toast.showErrorAlert('Sign Up Error', error.error);
      },
    });
  }
}
