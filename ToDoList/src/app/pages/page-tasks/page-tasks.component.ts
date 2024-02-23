import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-tasks',
  templateUrl: './page-tasks.component.html',
  styleUrl: './page-tasks.component.scss'
})
export class PageTasksComponent {
}
