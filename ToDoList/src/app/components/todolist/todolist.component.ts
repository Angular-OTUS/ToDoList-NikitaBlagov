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

  inputValue: any;

  public deleteItem(itemId: number) {
    this.todoItems = this.todoItems.filter(item => item.id !== itemId);
  }
  public  addItem() {
    const maxId = Math.max(...this.todoItems.map(item => item.id), 0);
    const text = this.inputValue;
    const newItem = {
      id: maxId + 1,
      text: text
    };
    this.todoItems.push(newItem);
  }

}
