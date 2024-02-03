import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from "../../services/toast.service";
import { TodoItemStatus } from 'src/app/models';


@Component({
  selector: 'todo-create-item',
  templateUrl: './todo-create-item.component.html',
  styleUrl: './todo-create-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateItemComponent {
  public form = new FormGroup({
    textInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    textarea: new FormControl('', [Validators.required])
  });
  constructor(
      private todoService: TodoService,
      private toastService: ToastService

  ) {}

  public addItem(): void {
		if (!this.form.valid) return;
    const text = this.form.controls.textInput.value as string;
    const description = this.form.controls.textarea.value as string;

    this.todoService.add({
      text: text,
      description: description,
			status: TodoItemStatus.ACTIVE
    }).subscribe();

		this.resetInputs();
		this.onAddTodo();
  }

	private resetInputs(): void {
		this.form.controls.textInput.setValue('');
    this.form.controls.textarea.setValue('');
	}

  public onAddTodo(): void {
    this.toastService.showToast('Задача добавлена');
  }

}
