import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { StateTodoStatus, TodoItem, TodoItemAdd, TodoItemStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  /** Состояние статуса всего списка задач */
  private stateTodoStatus: BehaviorSubject<StateTodoStatus> = new BehaviorSubject<StateTodoStatus>(StateTodoStatus.ALL);
  private stateTodos: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, nisi.',
      description: 'Description first task',
      id: 1,
      status: TodoItemStatus.ACTIVE
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nesciunt.',
      description: 'Description second task',
      id: 2,
      status: TodoItemStatus.ACTIVE
    }
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


  constructor() { }

  public setStatus(stateTodoStatus: StateTodoStatus): void {
    // if (this.stateTodoStatus.value === stateTodoStatus) return;
    this.stateTodoStatus.next(stateTodoStatus);
  }

  public add(todo: TodoItemAdd): void {
    const lastStateTodos = this.stateTodos.value;
    const maxId = Math.max(...lastStateTodos.map(item => item.id), 0);
    const newTodo = {
      ...todo,
      status: TodoItemStatus.ACTIVE,
      id: maxId + 1
    };

    this.stateTodos.next([...lastStateTodos, newTodo]);
  }

  public edit(editedTodo: TodoItem): void {
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

  public delete(id: number): void {
    const lastStateTodos = this.stateTodos.value;
    const findedTodoIdx = lastStateTodos.findIndex((stateTodo) => id === stateTodo.id);

    if (findedTodoIdx === -1) return;

    lastStateTodos[findedTodoIdx] = {
      ...lastStateTodos[findedTodoIdx],
      status: TodoItemStatus.COMPLETED
    };

    this.stateTodos.next(lastStateTodos);


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


}
