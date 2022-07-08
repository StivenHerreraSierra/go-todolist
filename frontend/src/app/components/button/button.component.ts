import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text?: string;
  @Input() icon?: string;
  @Input() type?: string;
  @Input() classes?: string;

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.clicked.emit();
  }
}
