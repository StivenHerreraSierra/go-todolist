import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router
  ) { }

  login = () => this.isAuthenticated = true;

  logout = () => {
    this.router.navigate(['/']);
    this.isAuthenticated = false;
  };

  isAuth = () => this.isAuthenticated;
}
