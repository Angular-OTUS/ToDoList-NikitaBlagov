import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TodoItem} from "../../models";
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-item-view',
  templateUrl: './todo-item-view.component.html',
  styleUrl: './todo-item-view.component.scss'
})
export class TodoItemViewComponent implements OnInit {
	private _id$: Observable<string | undefined> = this._route.params.pipe(
		map(params => params['id'])
	);
	public todoItem$: Observable<TodoItem | null> = this._id$.pipe(
		switchMap((id) => {
			if (id === undefined) return of(null);
			return this._todoService.getById(Number(id));
		}),
		tap((todoItem) => {
			console.log(todoItem);

			if (todoItem !== null) {
				this._todoService.select(todoItem.id);
			} else {
				this._todoService.select(null);
			}
		})
	)

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _todoService: TodoService,
		private readonly _cdr: ChangeDetectorRef
	) {
	}

	ngOnInit(): void {
		// this._cdr.detectChanges();
	}

	// save() {
	// 	this.saved.emit();
	// }


}