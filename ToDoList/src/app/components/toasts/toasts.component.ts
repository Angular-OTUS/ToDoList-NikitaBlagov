import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss'
})
export class ToastsComponent {

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    setInterval(() => {
      this.toastService.toasts.shift();
    }, 2000);
  }
  get toasts() {
    return this.toastService.toasts
  }


}
