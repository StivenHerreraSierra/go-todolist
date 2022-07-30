import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  private TOAST = Swal.mixin({
    toast: true,
    position: 'bottom',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  showErrorAlert(title: string, text?: string) {
    this.TOAST.fire({
      icon: 'error',
      title,
      text,
    });
  }

  showSuccessfulAlert(title: string, text?: string) {
    this.TOAST.fire({
      icon: 'success',
      title,
      text,
    });
  }
}
