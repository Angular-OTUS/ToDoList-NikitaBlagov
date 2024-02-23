import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTasksComponent } from './pages/page-tasks/page-tasks.component';
import { TodoItemViewComponent } from './components/todo-item-view/todo-item-view.component';
import { TodoItemViewEmptyComponent } from './components/todo-item-view-empty/todo-item-view-empty.component';

const routes: Routes = [


	{ path: '', redirectTo: 'tasks', pathMatch: 'full' },
	{ path: 'tasks', component: PageTasksComponent, children: [
		{ path: '', component: TodoItemViewEmptyComponent },
		{ path: ':id', component: TodoItemViewComponent }
	] },
	{ path: '**', redirectTo: '/' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
