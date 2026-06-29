import { z } from "zod";

export const CreateServiceValidator = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  image: z.string().url(),
  image_public_id: z.string().min(1),
  points: z.number().min(0)
});

export const UpdateServiceValidator = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive().optional(),
  image: z.string().url().optional(),
  points: z.coerce.number().min(1).optional()
});

export const adminCreateUserValidator = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z.string().optional(),
  role_id: z.number().min(1).max(2)
});