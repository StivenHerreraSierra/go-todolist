import { Component, OnInit } from '@angular/core';
import {pipe} from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home-task',
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.css']
})
export class HomeTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {}

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe();
  }

  editTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }
}
