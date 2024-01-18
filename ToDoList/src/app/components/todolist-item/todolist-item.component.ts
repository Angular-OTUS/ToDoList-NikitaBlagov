import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {TodoItem} from "../../models";
import { TodoService } from 'src/app/services/todo.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],

})
export class TodolistItemComponent implements OnChanges {
  @Input({ required: true }) public todoItem: TodoItem | null = null;
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  public isEdit: boolean = false;
  public allowedToEdit: boolean = false;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('todoItem' in changes && this.todoItem !== null) {
      this.allowedToEdit = this.todoItem.status === 'ACTIVE';
    }
  }

  public deleteItem(itemId: number): void {
    this.delete.emit(itemId);
  }

  public deleteItems(itemId: number): void {
    this.todoService.delete(itemId).subscribe();
  }

  public setEditMode(bool: boolean): void {
    if (this.allowedToEdit === false) return;

    this.isEdit = bool;
  }

  public saveEditItem(): void {
    if (this.todoItem === null) return;

    this.setEditMode(false);
    this.todoService.edit(this.todoItem).subscribe();
    this.toastService.showToast('Задача изменена');
  }

  public onDeleteTodo(): void {

    this.toastService.showToast('Задача удалена');
  }

  public clickItem(todoItem: TodoItem): void {
    if (this.allowedToEdit === false) return;
    this.todoService.select(todoItem.id);
  }


}
