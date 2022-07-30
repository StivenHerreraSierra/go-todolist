import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  login() {
    this.cookieService.set('isAuth', 'true', { path: "/" });
  }

  logout() {
    this.router.navigate(['/']);
    this.cookieService.set('isAuth', 'false', { path: "/" });
  };

  isAuth = () => this.cookieService.get('isAuth');
}
