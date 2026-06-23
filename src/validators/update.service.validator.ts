import { z } from "zod";

export const updateServiceValidator = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive().optional(),
  image: z.string().url().optional()
});