import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/models';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],
})
export class TodolistItemComponent {
  @Input({ required: true }) todoItem!: TodoItem;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  public deleteItem(itemId: number): void {
    this.delete.emit(itemId);
  }
}
