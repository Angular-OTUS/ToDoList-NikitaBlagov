import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { StateTodoStatus, TodoItem, TodoItemAdd, TodoItemStatus } from '../models';
import { TodoHttpService } from './todo-http.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  /** Состояние статуса всего списка задач */
  private stateTodoStatus: BehaviorSubject<StateTodoStatus> = new BehaviorSubject<StateTodoStatus>(StateTodoStatus.ALL);
  private stateTodos: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([
  ]);
  private stateSelectedItemId: BehaviorSubject<number | null> = new BehaviorSubject<null | number>(null);
  private selectedItem$: Observable<TodoItem | null> = this.stateSelectedItemId
    .pipe(
      map(selectedItemId => this.findById(selectedItemId as number))
    );

  public selectedItemId$: Observable<number | null> = this.stateSelectedItemId.asObservable();
  public selectedItemDescription$: Observable<string | null> = this.selectedItem$
    .pipe(
      map(selectedItem => (selectedItem ? selectedItem.description : null))
    );
  public todos$: Observable<TodoItem[]> = this.stateTodos.asObservable();

  /** Все задачи, отфильтрованные по текущему статусу */
  public todosFilteredByStatus$: Observable<TodoItem[]> = this.stateTodoStatus.pipe(
    switchMap(() => this.todos$),
    map(() => {
      const newStatus: any = this.stateTodoStatus.value;

      const arr = this.stateTodos.value.filter(todo => {
        if (newStatus === StateTodoStatus.ALL) return true;
        if (newStatus !== todo.status) return false;

        return true;
      });

      return arr;
    })
  );


  constructor(
		private readonly todoHttpService: TodoHttpService
	) {
		(window as any).todoService = this;

		this.todoHttpService.getAll().pipe(
			tap((serverTodos) => {
				this.stateTodos.next(serverTodos);
			})
		).subscribe();
	}

  public setStatus(stateTodoStatus: StateTodoStatus): void {
    // if (this.stateTodoStatus.value === stateTodoStatus) return;
    this.stateTodoStatus.next(stateTodoStatus);
  }

  public add(todo: TodoItemAdd): Observable<TodoItem | null> {
		return this.todoHttpService.create(todo).pipe(
			tap((serverNewTodo) => {
				if (serverNewTodo !== null) {
					this.stateTodos.next([...this.stateTodos.value, serverNewTodo]);
				}
			})
		);
  }

  public edit(editedTodo: TodoItem): Observable<TodoItem | null> {
		return this.todoHttpService.edit(editedTodo.id, {
			text: editedTodo.text,
			description: editedTodo.description,
			status: editedTodo.status
		}).pipe(
			tap((serverEditedTodo) => {
				if (serverEditedTodo !== null) {
					this._editNotServer(serverEditedTodo);
				}
			})
		)

  }

  public delete(id: number): void {
    const lastStateTodos = this.stateTodos.value;
    const findedTodoIdx = lastStateTodos.findIndex((stateTodo) => id === stateTodo.id);

    if (findedTodoIdx === -1) return;

    lastStateTodos[findedTodoIdx] = {
      ...lastStateTodos[findedTodoIdx],
      status: TodoItemStatus.COMPLETED
    };

    this.stateTodos.next(lastStateTodos);

    if (this.stateSelectedItemId.value === id) {
      this.stateSelectedItemId.next(null);
    }
    // удалять выбранный элемент, если выбран такой же элемент, который удаляют
    // const filteredTodos = lastStateTodos.filter(todo => todo.id !== id);
    // const currentSelectedId = this.stateSelectedItemId.value;

    // if (currentSelectedId === id) this.stateSelectedItemId.next(null);
    // this.stateTodos.next(filteredTodos);
  }

  public select(id: number): void {
    this.stateSelectedItemId.next(id);
  }

  public getAllStatus(): StateTodoStatus[] {
    return [ StateTodoStatus.ALL, StateTodoStatus.ACTIVE, StateTodoStatus.COMPLETED ];
  }

  public getCurrentStatus(): StateTodoStatus {
    return this.stateTodoStatus.value;
  }

  private findById(id: number): TodoItem | null {
    const findedTodoIdx = this.stateTodos.value.findIndex((stateTodo) => id === stateTodo.id);

    if (findedTodoIdx === -1) return null;
    return this.stateTodos.value[findedTodoIdx];
  }

	/** Редактирует только внутреннее хранилище this.stateTodos */
	private _editNotServer(editedTodo: TodoItem): void {
		const lastStateTodos = this.stateTodos.value;
    const findedTodoIdx = lastStateTodos.findIndex((stateTodo) => editedTodo.id === stateTodo.id);

    if (findedTodoIdx === -1) return;
    if (
      editedTodo.description === lastStateTodos[findedTodoIdx].description &&
      editedTodo.text === lastStateTodos[findedTodoIdx].text
    ) return;

    lastStateTodos[findedTodoIdx] = {
      id: editedTodo.id,
      description: editedTodo.description,
      text: editedTodo.text,
      status: editedTodo.status
    };

    this.stateTodos.next(lastStateTodos);
	}


}
