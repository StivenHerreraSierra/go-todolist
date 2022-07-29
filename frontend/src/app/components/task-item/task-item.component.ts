import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task | undefined;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() finishEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<Task>();

  $updateTaskModal?: Observable<boolean>;
  updateTaskModalService: ModalService = new ModalService();

  constructor() {}

  ngOnInit(): void {
    this.$updateTaskModal = this.updateTaskModalService.watch();
  }

  openUpdateModal = () => this.updateTaskModalService.open();

  edit(updatedTask: Task) {
    this.editEvent.emit(updatedTask);
    this.updateTaskModalService.close();
  }

  finish(code: number) {
    this.finishEvent.emit(code);
  }

  delete(code: number) {
    this.deleteEvent.emit(code);
  }
}
