import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, from, map } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone()).pipe(
      catchError((err: HttpErrorResponse) => {
        // Throw an error if the request failed and the url was sent to refresh endpoint.
        if (request.url.includes('refresh')) {
          return throwError(() => err);
        }

        // Throw an error if the request failed and the url was sent to signup endpoint.
        if (request.url.includes('signup')) {
          return throwError(() => err);
        }

        // Throw an error if the request failed and the url was sent to login endpoint.
        if (request.url.includes('login')) {
          return throwError(() => err);
        }

        // Throw and error if the status response was not 401, which means the error was not caused by the token.
        if (err.status !== 401) {
          return throwError(() => err);
        } else {
          return from(this.userService.refresh()).pipe(
            switchMap(() => next.handle(request.clone())),
            catchError((refreshErr: HttpErrorResponse) => {
              this.authService.logout();
              return throwError(() => refreshErr);
            })
          );
        }
      })
    );
  }
}
