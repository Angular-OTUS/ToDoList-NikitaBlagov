import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item-view',
  templateUrl: './todo-item-view.component.html',
  styleUrl: './todo-item-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemViewComponent {
	private _id$: Observable<string | undefined> = this._route.params.pipe(
		map(params => params['id'])
	);

	constructor(
		private readonly _route: ActivatedRoute,
	) {
		this._id$.subscribe(console.log);
	}
}
