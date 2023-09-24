import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponentComponent } from './todo-list-item-component.component';

describe('TodoListItemComponentComponent', () => {
  let component: TodoListItemComponentComponent;
  let fixture: ComponentFixture<TodoListItemComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListItemComponentComponent]
    });
    fixture = TestBed.createComponent(TodoListItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
