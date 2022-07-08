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
    return this.http.get<Task[]>("/assets/tasks.json");
  }

  updateTask(code: number, updatedTask: Task) {
    const i = this.tasks.findIndex(t => t.task_code === code);
    this.tasks[i] = updatedTask;
  }

  deleteTask(code: number) {
    this.tasks = this.tasks.filter(t => t.task_code !== code);
  }
}
