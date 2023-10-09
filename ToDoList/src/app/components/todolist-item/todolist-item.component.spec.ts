import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistItemComponent } from './todolist-item.component';

describe('TodolistItemComponent', () => {
  let component: TodolistItemComponent;
  let fixture: ComponentFixture<TodolistItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodolistItemComponent]
    });
    fixture = TestBed.createComponent(TodolistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
