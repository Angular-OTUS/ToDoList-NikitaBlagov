import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { TodoItem, TodoItemAdd } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private stateTodos: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  private stateSelectedItemId: BehaviorSubject<number | null> = new BehaviorSubject<null | number>(null);
  private selectedItem$ = this.stateSelectedItemId
    .pipe(
      filter(selectedItemId => selectedItemId !== null),
      map(selectedItemId => this.findById(selectedItemId as number)),
      filter(selectedItemId => selectedItemId !== null),
    );

  public selectedItemId$ = this.stateSelectedItemId.
    pipe(
      filter(selectedItemId => selectedItemId !== null),
    );
  public selectedItemDescription$: Observable<string | undefined> = this.selectedItem$
    .pipe(
      map(selectedItem => selectedItem?.description)
    );
  public todos$: Observable<TodoItem[]> = this.stateTodos.asObservable();


  constructor() { }

  public add(todo: TodoItemAdd): void {
    const lastStateTodos = this.stateTodos.value;
    const maxId = Math.max(...lastStateTodos.map(item => item.id), 0);
    const newTodo = {
      ...todo,
      id: maxId + 1
    };

    this.stateTodos.next([...lastStateTodos, newTodo]);
  }

  public edit(todo: TodoItem): void {
    const lastStateTodos = this.stateTodos.value;
    const findedTodoIdx = lastStateTodos.findIndex((stateTodo) => todo.id === stateTodo.id);

    if (findedTodoIdx === -1) return;
    lastStateTodos[findedTodoIdx] = {
      id: todo.id,
      description: todo.description,
      text: todo.text
    };

    this.stateTodos.next(lastStateTodos);
  }

  public delete(id: number): void {
    const lastStateTodos = this.stateTodos.value;
    const filteredTodos = lastStateTodos.filter(todo => todo.id !== id);

    this.stateTodos.next(filteredTodos);
  }

  public select(id: number): void {
    this.stateSelectedItemId.next(id);
  }

  private findById(id: number): TodoItem | null {
    const findedTodoIdx = this.stateTodos.value.findIndex((stateTodo) => id === stateTodo.id);

    if (findedTodoIdx === -1) return null;
    return this.stateTodos.value[findedTodoIdx];
  }


}
