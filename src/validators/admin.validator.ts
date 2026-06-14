import { z } from "zod";

export const adminCreateUserValidator = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z.string().optional(),
  role_id: z.number().min(1).max(2)
});