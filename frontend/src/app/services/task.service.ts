import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../models/task';
import { map, Subject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  tasksSubject = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  watch(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    return this.http
      .post<Task>('http://localhost:8000/api/task/new', task, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(
        map((data: Task) => {
          this.tasks = [...this.tasks, data];
          this.tasksSubject.next(this.tasks);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  getTasks() {
    return this.http
      .get<Task[]>('http://localhost:8000/api/tasks', {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(
        map((data: Task[]) => {
          this.tasks = data;
          console.log(this.tasks);
          this.tasksSubject.next(this.tasks);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  updateTask(task: Task) {
    return this.http
      .patch<Task>('http://localhost:8000/api/task/update', task, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(
        map((data: Task) => {
          const index = this.tasks.findIndex(
            (t) => t.task_code === data.task_code
          );

          this.tasks[index] = data;
        }),
        catchError((err) => throwError(() => err))
      );
  }

  deleteTask(code: number) {
    return this.http
      .delete(`http://localhost:8000/api/task/remove/${code}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(
        map(() => {
          this.tasks = this.tasks.filter((t) => t.task_code !== code);
          this.tasksSubject.next(this.tasks);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  finishTask(code: number) {
    return this.http
      .patch<Task>(
        `http://localhost:8000/api/task/finish/${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .pipe(
        map((data: Task) => {
          const index = this.tasks.findIndex((t) => t.task_code == code);
          this.tasks[index].task_status = data.task_status;
        }),
        catchError((err) => throwError(() => err))
      );
  }
}
