import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/models';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';

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
  public isLoading: boolean = true;
  public todos$: Observable<TodoItem[]> = this.todoService.todos$;

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit(): void  {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  public deleteItem(itemId: number): void {
    this.todoService.delete(itemId);
  }

  public  addItem(): void {
    const text = this.form.controls.textInput.value as string;
    const description = this.form.controls.textarea.value as string;

    this.todoService.add({
      text: text,
      description: description
    });

    this.form.controls.textInput.setValue('');
    this.form.controls.textarea.setValue('');
  }

  public clickItem(todoItem: TodoItem): void {
    this.selectedItemId = todoItem.id;
  }

  public getSelectedDescriptionItem(): string {
    // if (this.selectedItemId === null) return '';

    // const findedItem = this.todoItems.find(item => item.id === this.selectedItemId);

    // if (findedItem === undefined) return '';

    // return findedItem.description;
    return '';
  }

}
