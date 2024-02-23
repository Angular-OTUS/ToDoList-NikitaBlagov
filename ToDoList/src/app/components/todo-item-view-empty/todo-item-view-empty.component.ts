import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item-view-empty',
  templateUrl: './todo-item-view-empty.component.html',
  styleUrl: './todo-item-view-empty.component.scss'
})
export class TodoItemViewEmptyComponent implements OnInit {
	constructor(
		private readonly _todoService: TodoService,
		private readonly _cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this._todoService.select(null);
	}
}
