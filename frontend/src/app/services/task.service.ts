import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  
  constructor(
    private http: HttpClient
  ) { }

  addTask(task: Task) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  getTask(code: number) {
    return this.tasks.filter(t => t.task_code === code);
  }
  
  getTasks() {
    return this.http.get<Task[]>("http://localhost:8000/api/tasks", {
      headers: {
        'Content-type': 'application/json'
      },
      withCredentials: true
    });
  }

  updateTask(code: number, updatedTask: Task) {
    const i = this.tasks.findIndex(t => t.task_code === code);
    this.tasks[i] = updatedTask;
  }

  deleteTask(code: number) {
    return this.http.delete(`http://localhost:8000/api/task/remove/${code}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }
}
