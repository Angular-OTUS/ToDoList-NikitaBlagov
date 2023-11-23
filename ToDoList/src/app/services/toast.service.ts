import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private stateToasts: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public toasts$: Observable<string[]> = this.stateToasts.asObservable();

  public showToast(message: string): void {
   const lastStateToasts = this.stateToasts.value;

   this.scheduleDeletion(message);
   this.stateToasts.next([...lastStateToasts, message]);
  }

  private scheduleDeletion(message: string, timeSchedule: number = 2000): void {
    setTimeout(() => {
      const lastStateToasts = this.stateToasts.value;

      for (let i = 0; i < lastStateToasts.length; i++) {
        if (lastStateToasts[i] === message) {
          lastStateToasts.splice(i, 1);
          break;
        }
      }

      this.stateToasts.next(lastStateToasts);

    }, timeSchedule);
  }

}
