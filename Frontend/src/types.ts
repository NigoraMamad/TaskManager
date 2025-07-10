export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Status = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export interface CardItem {
  id: string;
  title: string;
  content: string; // вместо description
  dueDate: number; // UNIX timestamp (в мс)
  createdDate: number; // UNIX timestamp (в мс)
  priority: Priority;
  status: Status;
  userId: number;
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
