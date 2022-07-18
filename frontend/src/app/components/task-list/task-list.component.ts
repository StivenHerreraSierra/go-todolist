import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  tasksObs$?: Observable<Task[]>;
  
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.tasksObs$ = this.taskService.watch();
    this.tasksObs$.subscribe(tasks => this.tasks = tasks);
    this.taskService.getTasks().subscribe();
  }
}
