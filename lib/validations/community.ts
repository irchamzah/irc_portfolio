import * as z from "zod";

export const CommunityValidation = z.object({
  bio: z.string().min(3).max(1000),
});
