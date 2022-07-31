import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import {catchError, map, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  login(credentials: Credentials) {
    return this.http.post(
      'https://golangtodo-api.herokuapp.com/api/user/login',
      JSON.stringify(credentials),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    ).pipe(
      map(() => this.authService.login())
    );
  }

  signUp(user: User) {
    console.log(user);
    return this.http.post(
      'https://golangtodo-api.herokuapp.com/api/user/signup',
      JSON.stringify(user),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    );
  }

  refresh() {
    return this.http.post(
      'https://golangtodo-api.herokuapp.com/api/user/refresh',
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.post('http://localhost:8000/api/user/logout', {}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).pipe(
      catchError(err => {
        console.log("error:", err);
	return throwError(() => err);
      })
    );
  }
}
