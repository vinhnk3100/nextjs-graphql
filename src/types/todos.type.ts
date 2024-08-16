// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Todo = {
  id: string;
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dateStart: string;
  dateEnd: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  username: string;
};

export type UpdateTodoDto = {
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  dateStart: Date;
  dateEnd: Date;
};

export type CreateTodoDto = {
  title: string;
  content: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  dateStart: Date;
  dateEnd: Date;
};

export type TodoActionOutput = {
  status: boolean;
  message: string;
  statusCode: number;
}