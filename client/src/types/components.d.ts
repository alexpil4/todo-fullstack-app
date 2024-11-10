export interface TaskItem {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp: Date;
}

export interface TaskItemToAdd {
  title: string;
  description: string;
  completed: boolean;
}
