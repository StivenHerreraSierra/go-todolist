import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() formMethod!: string;
  @Input() title!: string;
  
  insertTask = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(26)]],
    description: '',
    dueDate: [(new Date()).toLocaleDateString('sv'), this.presentOrFutureDate()]
  });
  

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  addTask() {
    const newTask = {
      task_code: -1,
      task_title: this.insertTask.get('title')?.value || "",
      task_description: this.insertTask.get('description')?.value || "",
      task_start: (function (today: Date) { return today.toISOString().split('T')[0]})(new Date),
      task_due: (function (today: Date) { return today.toISOString().split('T')[0]})(new Date(this.insertTask.get('dueDate')?.value || Date.now())),
      task_status: "PENDIENTE",
      task_owner: ""
    };
    
    this.taskService.addTask(newTask);
  }

  cancel() {
    this.insertTask.reset();
  }

  presentOrFutureDate (): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = (new Date()).toLocaleDateString('sv'); // yyyy-mm-dd
      return control.value < today ? {presentOrFuture: {value: control.value}} : null;
    }
  }
}
