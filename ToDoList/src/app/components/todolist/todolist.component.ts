import { Component } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent {
  todoItems = [
    { id: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, commodi?' },
    { id: 2, text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 3, text: 'Lorem ipsum dolor sit.' }
  ];

  public deleteItem(itemId: number) {
    this.todoItems = this.todoItems.filter(item => item.id !== itemId);
  }


}
