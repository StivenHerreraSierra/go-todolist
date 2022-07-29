import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css'],
})
export class ErrorFieldComponent implements OnInit {
  @Input() formField!: FormControl;

  constructor() {}

  ngOnInit(): void {}

  presentOrFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const today = new Date().toLocaleString('sv'); //yyyy-mm-dd
      return control.value < today
        ? { presentOrFuture: { value: control.value } }
        : null;
    };
  }
}
