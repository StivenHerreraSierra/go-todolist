import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

const MAX_ROWS = 4;
const MAX_COLS = 26;

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() formMethod!: string;
  @Input() title!: string;
  @Input() task?: Task;
  @Input() event?: string;
  @Output() submitEvent = new EventEmitter();

  insertTask = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(26)]],
    description: '',
    dueDate: [new Date().toLocaleDateString('sv'), this.presentOrFutureDate()],
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.event = this.event ?? 'add';

    if (this.event === 'add') {
      this.initTask();
    } else {
      this.insertTask.get('title')!.setValue(this.task!.task_title);
      this.insertTask
        .get('description')!
        .setValue(this.task?.task_description || '');
      this.insertTask.get('dueDate')!.setValue(this.task!.task_due);
    }
  }

  private initTask() {
    this.task = {} as Task;

    this.task.task_code = -1;
    this.task.task_start = new Date().toLocaleDateString('sv');
    this.task.task_status = 'PENDIENTE';
  }

  submit() {
    this.task!.task_title = this.insertTask.get('title')?.value || '';
    this.task!.task_description =
      this.insertTask.get('description')?.value || '';
    this.task!.task_due =
      this.insertTask.get('dueDate')?.value ||
      new Date().toLocaleDateString('sv');

    this.submitEvent.emit(this.task);

    this.clear();
  }

  clear() {
    this.insertTask.reset();
    this.initTask();
  }

  presentOrFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date().toLocaleDateString('sv'); // yyyy-mm-dd
      return control.value < today
        ? { presentOrFuture: { value: control.value } }
        : null;
    };
  }

  get maxRows() {
    return MAX_ROWS;
  }

  get maxCols() {
    return MAX_COLS;
  }

  get getEvent(): string {
    const firstLetter = this.event?.charAt(0).toUpperCase() || '';
    const name = firstLetter + this.event?.slice(1);

    return name;
  }
}
