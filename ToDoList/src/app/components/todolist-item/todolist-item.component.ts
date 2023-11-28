import { Component, EventEmitter, Input, Output } from '@angular/core';
import {TodoItem} from "../../models";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],
})
export class TodolistItemComponent {
  @Input({ required: true }) public todoItem!: TodoItem;
  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();


  public deleteItem(itemId: number): void {
    this.delete.emit(itemId);
  }
}
