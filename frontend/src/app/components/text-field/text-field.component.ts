import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextFieldComponent
  }]
})
export class TextFieldComponent implements ControlValueAccessor {

  @Input() type?: string;
  @Input() placeholder?: string;
  @Input() title?: string = "";
  @Input() icon?: string;
  @Input() fieldName!: string;
  @Input() parentForm?: FormGroup;

  value: string = "";
  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  onChangeHandler = (event: Event) => {
    const text: string = ( <HTMLInputElement>event.target ).value;
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
