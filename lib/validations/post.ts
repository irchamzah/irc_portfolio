import * as z from "zod";

export const PostValidation = z.object({
  post: z.string().nonempty().min(1, { message: "Minimum 1 Character" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  post: z.string().nonempty().min(1, { message: "Minimum 1 Character" }),
});
