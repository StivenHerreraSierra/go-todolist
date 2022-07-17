import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display$ = new Subject<boolean>;

  constructor() { }

  watch(): Observable<boolean> {
    return this.display$.asObservable();
  }

  open() {
    this.display$.next(true);
  }

  close() {
    this.display$.next(false);
  }
}
