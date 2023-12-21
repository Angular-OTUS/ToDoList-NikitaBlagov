import { Component } from '@angular/core';
import { TodoHttpService } from './services/todo-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoList';

	constructor(
		private readonly todoHttpService: TodoHttpService
	) {
		(window as any).todoHttpService = todoHttpService;
	}
}
