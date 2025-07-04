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

export type LoginPropsInput = {
  phoneNumber: string;
  password: string;
 };

 export type RegistrationPropsInput = {
   fullName: string;
   phoneNumber: string;
   password: string;
   confirmPassword: string;
 };
