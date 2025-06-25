export type Priority = "Low" | "Medium" | "Top";
export type Status = 'To do' | 'In progress' | 'Review' | 'Done';
export interface CardItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status?: Status;
  createdAt?: string;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardItem[];
}