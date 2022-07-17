import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  login(credentials: Credentials) {
    return this.http.post("http://localhost:8000/api/user/login", JSON.stringify(credentials), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }
  
  signUp(user: User) {
    console.log(user);
    return this.http.post("http://localhost:8000/api/user/signup", JSON.stringify(user), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }
}
