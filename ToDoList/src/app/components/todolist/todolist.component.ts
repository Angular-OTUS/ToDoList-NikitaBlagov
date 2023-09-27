import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/models';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent {
  public form = new FormGroup({
    textInput: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  public todoItems: TodoItem[] = [
    { id: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, commodi?' },
    { id: 2, text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 3, text: 'Lorem ipsum dolor sit.' }
  ];

  public deleteItem(itemId: number): void {
    this.todoItems = this.todoItems.filter(item => item.id !== itemId);
  }

  public getMaxId(items: any[]) {
    return Math.max(...items.map(item => item.id), 0);
  }
  public  addItem(): void {
    const maxId = this.getMaxId(this.todoItems)
    const text: string = this.form.controls.textInput.value as string;
    if (text === null) {
      return;
    }
    const newItem = {
      id: maxId + 1,
      text: text
    };

    this.todoItems.push(newItem);
    this.form.controls.textInput.setValue('');
  }

}
