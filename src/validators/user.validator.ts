import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z.string().optional()
});