import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css']
})
export class ErrorFieldComponent implements OnInit {

  @Input() formField!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
