export enum TodoItemStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export enum StateTodoStatus {
  ACTIVE = TodoItemStatus.ACTIVE,
  COMPLETED = TodoItemStatus.COMPLETED,
  ALL = 'ALL'
}

export interface TodoItem {
	id: number;
  text: string;
  description: string;
  status: TodoItemStatus
}

export interface TodoItemAdd {
  text: string;
  description: string;
	status: TodoItemStatus
}

