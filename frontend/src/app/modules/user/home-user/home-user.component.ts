import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  $loginModal!: Observable<boolean>;
  $signUpModal!: Observable<boolean>;
  
  loginModalService: ModalService = new ModalService();
  signUpModalService: ModalService = new ModalService();

  openLogin = () => this.loginModalService.open();
  openSignUp = () => this.signUpModalService.open();

  constructor() { }

  ngOnInit(): void {
    this.$loginModal = this.loginModalService.watch();
    this.$signUpModal = this.signUpModalService.watch();
  }
}
