import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodolistItemComponent } from './components/todolist-item/todolist-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from './shared/shared.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodoCreateItemComponent } from "./components/todo-create-item/todo-create-item.component";
import { HttpClientModule } from '@angular/common/http';
import { PageTasksComponent } from './pages/page-tasks/page-tasks.component';
import { TodoItemViewComponent } from './components/todo-item-view/todo-item-view.component';
import { TodoItemViewEmptyComponent } from './components/todo-item-view-empty/todo-item-view-empty.component';
;
@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TodolistItemComponent,
    TooltipComponent,
    ToastsComponent,
    TodoCreateItemComponent,
    PageTasksComponent,
    TodoItemViewComponent,
    TodoItemViewEmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatButtonToggleModule,
		HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
