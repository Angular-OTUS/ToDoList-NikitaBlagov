import { Component, EventEmitter, Input, Output } from '@angular/core';
import {TodoItem} from "../../models";
import {SharedModule} from "../../shared/shared.module";
import { TodoService } from 'src/app/services/todo.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],

})
export class TodolistItemComponent {
  @Input({ required: true }) public todoItem!: TodoItem;
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  public isEdit: boolean = false;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}


  public deleteItem(itemId: number): void {
    this.delete.emit(itemId);
  }

  public setEditMode(bool: boolean): void {
    this.isEdit = bool;
  }

  public saveEditItem(): void {
    this.setEditMode(false);
    this.todoService.edit(this.todoItem);
    this.toastService.showToast('Задача изменена');
  }

  public onDeliteTodo(): void {
    this.toastService.showToast('Задача удалена');
  }


}
