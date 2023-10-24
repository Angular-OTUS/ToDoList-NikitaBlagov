import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/models';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit{
  public selectedItemId: number | null = null;
  public form = new FormGroup({
    textInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    textarea: new FormControl('', [Validators.required])
  });

  public todoItems: TodoItem[] = [
    { id: 1, description: '123', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, commodi?' },
    { id: 2, description: '234', text: 'Lorem ipsum dolor sit amet consectetur.' },
    { id: 3, description: '456', text: 'Lorem ipsum dolor sit.' }
  ];
  public isLoading: boolean = true;

  ngOnInit(): void  {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  public deleteItem(itemId: number): void {
    this.todoItems = this.todoItems.filter(item => item.id !== itemId);
  }

  public  addItem(): void {
    const maxId = Math.max(...this.todoItems.map(item => item.id), 0);
    const text = this.form.controls.textInput.value as string;
    const description = this.form.controls.textarea.value as string;

    if (text !== null) {
      const newItem = {
        id: maxId + 1,
        text: text,
        description: description
      };

      this.todoItems.push(newItem);
    }

    this.form.controls.textInput.setValue('');
    this.form.controls.textarea.setValue('');
  }

  public clickItem(todoItem: TodoItem): void {
    this.selectedItemId = todoItem.id;
  }

  public getSelectedDescriptionItem(): string {
    if (this.selectedItemId === null) return '';

    const findedItem = this.todoItems.find(item => item.id === this.selectedItemId);

    if (findedItem === undefined) return '';

    return findedItem.description;
  }

}
