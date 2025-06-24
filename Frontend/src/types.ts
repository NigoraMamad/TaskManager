export type Priority = "Low" | "Medium" | "Top";

export interface CardItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardItem[];
}
