import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateTodoStatus, TodoItem } from 'src/app/models';
import { TodoService } from 'src/app/services/todo.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  public isLoadingState$ = new BehaviorSubject({ isLoading: true });
  public todos$: Observable<TodoItem[]> = this.todoService.todosFilteredByStatus$;
  public selectedItemIdForEdit: number | null = null;
  public selectedItemId$: Observable<number | null> = this.todoService.selectedItemId$;
  public selectedItemDescription$: Observable<string | null> = this.todoService.selectedItemDescription$;
  public allStatus: StateTodoStatus[] = this.todoService.getAllStatus();
  private countCallsGetDefaultBtnStatus: number = 0;

  constructor(
    private todoService: TodoService,
		private readonly _route: ActivatedRoute,
  ) {}

  ngOnInit(): void  {
    setTimeout(() => {
      this.isLoadingState$.next({ isLoading: false });
    }, 500);
  }

  public clickBtnStatus(status: StateTodoStatus): void {
    this.todoService.setStatusForStateTodoStatus(status);

  }

  public getDefaultBtnStatus(): string {
    this.countCallsGetDefaultBtnStatus++;
    if (this.countCallsGetDefaultBtnStatus !== 1) return this.todoService.getCurrentStatus();
    const defaultStatus = StateTodoStatus.ACTIVE;

    this.todoService.setStatusForStateTodoStatus(defaultStatus);

    return defaultStatus;
  }



}
