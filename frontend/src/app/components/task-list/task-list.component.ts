import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  tasksObs$?: Observable<Task[]>;

  $addTaskModal!: Observable<boolean>;
  addTaskModalService: ModalService = new ModalService();

  @Output() addEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasksObs$ = this.taskService.watch();
    this.tasksObs$.subscribe((tasks) => (this.tasks = tasks));
    this.taskService.getTasks().subscribe();

    this.$addTaskModal = this.addTaskModalService.watch();
  }

  addTask(task: Task) {
    this.addEvent.emit(task);
    this.addTaskModalService.close();
  }

  editTask(task: Task) {
    this.editEvent.emit(task);
  }

  deleteTask(code: number) {
    this.taskService.deleteTask(code).subscribe({
      error: (err) => console.error('Error deleting:', err),
    });
  }

  finishTask(code: number) {
    this.taskService.finishTask(code).subscribe({
      error: (err) => console.error('Error finishing:', err),
    });
  }

  openAddTaskModal = () => this.addTaskModalService.open();
}
