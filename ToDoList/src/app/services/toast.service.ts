import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: string[] = [];

  constructor() { }

  showToast(message: string) {
    this.toasts.push(message)
  }



}
