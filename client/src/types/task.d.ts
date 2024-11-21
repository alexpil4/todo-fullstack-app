export interface TaskItem {
  _id: string;
  description: string;
  priority: string;
  completed: boolean;
  fromTime: string;
  toTime: string;
}

export interface TaskItemToAdd {
  description: string;
  priority: string;
  completed: boolean;
  fromTime: string;
  toTime: string;
}

export interface TaskItemToEdit {
  _id: string;
  description: string;
  priority: string;
  completed: boolean;
  fromTime: string;
  toTime: string;
}
