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
