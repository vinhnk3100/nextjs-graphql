import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const TodoSchema = z.object({
  title: z.string().min(1, {
    message: "Todo title is required",
  }),
  content: z.string().min(1, {
    message: "Todo title is required",
  }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "DONE"]),
  dateStart: z.date(),
  dateEnd: z.date()
});