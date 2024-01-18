import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem, TodoItemAdd } from '../models';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

	private url: string = 'http://localhost:3000/todos';

  constructor(
		private readonly http: HttpClient
	) {

	}

	getById(id: number): Observable<TodoItem | null> {
		return this.http.get<TodoItem | null>(`${this.url}/${id}`)
			.pipe(
				catchError((err) => {
					return of(null);
				})
			);

	}

	getAll(): Observable<TodoItem[]> {
		return this.http.get<TodoItem[]>(this.url)
			.pipe(
				catchError((err) => {
					return of([]);
				})
			);
	}

	// deleteById(id: number): Observable<null | boolean> {
	// 	return this.http.delete<{}>(`${this.url}/${id}`)
	// 		.pipe(
	// 			map(() => {
	// 				return true;
	// 			}),
	// 			catchError((err) => {
	// 				return of(null);
	// 			})
	// 		);
	// }

	deleteById(id: number): Observable<any> {

		return this.http.delete(`${this.url}/${id}`)
			.pipe(
				catchError(err => {
					return of(null);
				})
			);

	}

	create(todo: TodoItemAdd): Observable<TodoItem | null> {
		return this.http.post<TodoItem>(this.url, todo)
			.pipe(
				catchError((err) => {
					return of(null);
				})
			);
	}

	edit(id: number, todo: TodoItemAdd): Observable<TodoItem | null> {
		return this.http.patch<TodoItem>(`${this.url}/${id}`, todo)
			.pipe(
				catchError((err) => {
					return of(null);
				})
			);
	}

}


// Observable<null | boolean>



