import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .subscribe(
        (data: Task[]) => this.tasks = data
      );
  }
  
  deleteTask(code: number) {
    this.tasks = this.tasks.filter(t => t.task_code !== code);
  }
}
