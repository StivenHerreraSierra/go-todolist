import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() modalService!: ModalService;

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.modalService.close();
  }
}
