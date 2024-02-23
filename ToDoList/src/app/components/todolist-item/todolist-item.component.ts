import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {TodoItem} from "../../models";
import { TodoService } from 'src/app/services/todo.service';
import { ToastService } from 'src/app/services/toast.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss']
})
export class TodolistItemComponent implements OnChanges {
  @Input({ required: true }) public todoItem!: TodoItem;
  public stateIsEdit$ = new BehaviorSubject({ isEdit: false });
  public allowedToEdit: boolean = false;
	public selectedItemId$: Observable<number | null> = this.todoService.selectedItemId$
	.pipe(
		tap(selectedItemId => {
			this._cdr.detectChanges();
			// console.log(selectedItemId);
		})
	);
	public todoItemLink$ = this._getTodoItemLink();

  constructor(
    private todoService: TodoService,
    private toastService: ToastService,
		private readonly _route: ActivatedRoute,
		private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('todoItem' in changes) {
      this.allowedToEdit = this.todoItem.status === 'ACTIVE';
    }
  }

  public setEditMode(bool: boolean): void {
    if (this.allowedToEdit === false) return;
    this.stateIsEdit$.next({ isEdit: bool });
  }

  public saveEditItem(): void {
    this.setEditMode(false);
    this.todoService.edit(this.todoItem).subscribe();
    this.toastService.showToast('Задача изменена');
  }

	public clickItem(todoItem: TodoItem, _event: any): void {
		const event = _event as PointerEvent;
		const targetNode = event.target as HTMLElement;
		const isTodolistItem = targetNode.classList.contains('todolist-item') || targetNode.classList.contains('todolist-item__content');

    if (this.allowedToEdit === false) return;
		if (isTodolistItem === false) return; // если кликнули на .todolist-item или .todolist-item__content, то завершить функцию

    this.todoService.select(todoItem.id);
  }

  public deleteTodo(_event: any): void {
		const event = _event as PointerEvent;

		event.stopPropagation();

		this.todoService.setStatusCompletedForTask(this.todoItem).subscribe((editedTodo) => {
			if (editedTodo === null) return;
			this.setEditMode(false);
			this.toastService.showToast('Задача удалена');
		});
  }

	private _getTodoItemLink(): Observable<string> {
		return this.selectedItemId$.pipe(
			map(selectedItemId => {
				if (selectedItemId === this.todoItem.id) {
					return '/tasks/';
				}
				return `/tasks/${this.todoItem.id}`;
			}),
			tap(url => {
				this._cdr.detectChanges();
				console.log(url, this.todoItem.id);
			})
		);
	}


}
