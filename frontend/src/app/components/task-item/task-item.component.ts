import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task | undefined;
  @Output() deleteEvent = new EventEmitter<number>();

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  delete(code: number) {
      this.taskService.deleteTask(code).subscribe();
  }
}
