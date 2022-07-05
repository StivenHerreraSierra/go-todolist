import { Component, OnInit } from '@angular/core';
import { Task, tasks } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.tasks = tasks;
    console.log(this.tasks);
  }
}
