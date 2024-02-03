import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent {

  public toasts$: Observable<string[]> = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}



}
