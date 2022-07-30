import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-task',
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.css'],
})
export class HomeTaskComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private toastService: ToastService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.toastService.showSuccessfulAlert(
          'Added Task',
          'New task was added to the list.'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toastService.showErrorAlert('Error Adding', error.error);
      },
    });
  }

  editTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.toastService.showSuccessfulAlert(
          'Edited Task',
          'Your task was edited successfully'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toastService.showErrorAlert('Error Editing', error.error);
      },
    });
  }

  deleteTask(code: number) {
    this.taskService.deleteTask(code).subscribe({
      next: () => {
        this.toastService.showSuccessfulAlert(
          'Deleted Task',
          'Your task was deleted successfully.'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toastService.showErrorAlert('Error Deleting', error.error);
      },
    });
  }

  finishTask(code: number) {
    this.taskService.finishTask(code).subscribe({
      next: () => {
        this.toastService.showSuccessfulAlert(
          'Finished Task',
          'Your task was closed successfully.'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toastService.showErrorAlert('Error Closing', error.error);
      },
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
        this.toastService.showSuccessfulAlert(
          'Successful Logout',
          'Goodbye, see you soon.'
        );
      },
      error: (err) => {
        const { error } = err;
        this.toastService.showErrorAlert('Error Logout', error.error);
      },
    });
  }
}
