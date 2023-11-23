import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private stateToasts: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public toasts$: Observable<string[]> = this.stateToasts.asObservable();

  constructor() {
    setInterval(() => {
      this.deleteLastToast();
    }, 2000);
  }

  public showToast(message: string): void {
   const lastStateToasts = this.stateToasts.value;

   this.stateToasts.next([...lastStateToasts, message]);
  }

  private deleteLastToast(): void {
    const lastStateToasts = this.stateToasts.value;

    lastStateToasts.pop();
    this.stateToasts.next(lastStateToasts);
  }

}
