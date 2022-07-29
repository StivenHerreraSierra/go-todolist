import { Component, Input, OnInit } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: TextAreaFieldComponent
  }]
})
export class TextAreaFieldComponent implements ControlValueAccessor {
  @Input() placeholder?: string = "";
  @Input() title?: string = "";
  @Input() icon?: string;
  @Input() fieldName!: string;
  @Input() parentForm?: FormGroup;
  @Input() rows: number = 100;
  @Input() cols: number = 100;

  value: string = "";
  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  onChangeHandler = (event: Event) => {
    const text: string = (<HTMLInputElement>event.target).value;
    this.onChange(text);
  }

  constructor() { }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
}
