import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/models';
import { TodoService } from 'src/app/services/todo.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  public form = new FormGroup({
    textInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    textarea: new FormControl('', [Validators.required])
  });
  public isLoading: boolean = true;
  public todos$: Observable<TodoItem[]> = this.todoService.todos$;
  public selectedItemIdForEdit: number | null = null;
  public selectedItemId$: Observable<number | null> = this.todoService.selectedItemId$;
  public selectedItemDescription$: Observable<string | null> = this.todoService.selectedItemDescription$;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}




  ngOnInit(): void  {
    setTimeout(() => {
      this.isLoading = false;
    }, 50000);

    // console.log(1);

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

    console.log('addItem');


    this.form.controls.textInput.setValue('');
    this.form.controls.textarea.setValue('');
  }

  public clickItem(todoItem: TodoItem): void {
    this.todoService.select(todoItem.id);
  }

  onAddTodo() {
    this.toastService.showToast('Задача добавлена');
  }



}
