import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { HomeTaskComponent } from './modules/task/home-task/home-task.component';
import { HomeUserComponent } from './modules/user/home-user/home-user.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserSignupFormComponent } from './components/user-signup-form/user-signup-form.component';
import { ModalComponent } from './components/modal/modal.component';
import {AuthInterceptor} from './interceptors/auth-interceptor.interceptor';
import {AuthService} from './services/auth.service';
import { LoginGuard} from './auth/login.guard';
import { TasksGuard } from './auth/tasks.guard';
import { TextAreaFieldComponent } from './components/text-area-field/text-area-field.component';
import { TaskUpdateFormComponent } from './components/task-update-form/task-update-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskItemComponent,
    TopBarComponent,
    ButtonComponent,
    TaskFormComponent,
    UserLoginFormComponent,
    HomeTaskComponent,
    HomeUserComponent,
    TextFieldComponent,
    ErrorFieldComponent,
    UserFormComponent,
    UserSignupFormComponent,
    ModalComponent,
    TextAreaFieldComponent,
    TaskUpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeUserComponent, canActivate: [LoginGuard] },
      { path: 'tasks', component: HomeTaskComponent, canActivate: [TasksGuard] }
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    AuthService,
    LoginGuard,
    TasksGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
