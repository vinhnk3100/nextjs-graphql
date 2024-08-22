import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: "Post title is required",
  }),
  thumbnail: z.string(),
  content: z.string(),
  username: z.string(),
  postApproval: z.boolean()
});
