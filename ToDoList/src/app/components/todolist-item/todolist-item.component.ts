import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {TodoItem} from "../../models";
import { TodoService } from 'src/app/services/todo.service';
import { ToastService } from 'src/app/services/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],

})
export class TodolistItemComponent implements OnChanges {
  @Input({ required: true }) public todoItem!: TodoItem;
  public stateIsEdit$ = new BehaviorSubject({ isEdit: false });
  public allowedToEdit: boolean = false;
	public selectedItemId$: Observable<number | null> = this.todoService.selectedItemId$;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
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

  public deleteTodo(): void {
		this.todoService.setStatusCompletedForTask(this.todoItem).subscribe((editedTodo) => {
			if (editedTodo === null) return;
			this.setEditMode(false);
			console.log(this.stateIsEdit$.value);

			this.toastService.showToast('Задача удалена');
		});
  }

  public clickItem(todoItem: TodoItem): void {
    if (this.allowedToEdit === false) return;
    this.todoService.select(todoItem.id);
  }




}
