import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  // email: z.string().email(),
  password: z.string().min(6),
  contact_number: z.string().optional(),
  role_id: z.number().optional()
});

