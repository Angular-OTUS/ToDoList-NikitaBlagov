import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateTodoStatus, TodoItem } from 'src/app/models';
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
  public todos$: Observable<TodoItem[]> = this.todoService.todosFilteredByStatus$;
  public selectedItemIdForEdit: number | null = null;
  public selectedItemId$: Observable<number | null> = this.todoService.selectedItemId$;
  public selectedItemDescription$: Observable<string | null> = this.todoService.selectedItemDescription$;
  public allStatus: StateTodoStatus[] = this.todoService.getAllStatus();
  private countCallsGetDefaultBtnStatus: number = 0;

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {}




  ngOnInit(): void  {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    // console.log(1);

  }

  // public deleteItem(itemId: number): void {
  //   this.todoService.delete(itemId);
  // }

  public addItem(): void {
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

  public onAddTodo(): void {
    this.toastService.showToast('Задача добавлена');
  }

  public clickBtnStatus(status: StateTodoStatus): void {
    this.todoService.setStatus(status);

  }

  public getDefaultBtnStatus(): string {
    this.countCallsGetDefaultBtnStatus++;
    if (this.countCallsGetDefaultBtnStatus !== 1) return this.todoService.getCurrentStatus();
    const defaultStatus = StateTodoStatus.ACTIVE;

    this.todoService.setStatus(defaultStatus);

    return defaultStatus;
  }



}
