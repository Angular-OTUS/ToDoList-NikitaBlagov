import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { TodoItem, TodoItemAdd } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private stateTodos: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([
    {
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, nisi.',
      description: 'Description first task',
      id: 1
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, nesciunt.',
      description: 'Description second task',
      id: 2
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
    if (
      todo.description === lastStateTodos[findedTodoIdx].description &&
      todo.text === lastStateTodos[findedTodoIdx].text
    ) return;

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
    const currentSelectedId = this.stateSelectedItemId.value;

    if (currentSelectedId === id) this.stateSelectedItemId.next(null);
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
