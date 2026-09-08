import { z } from "zod";

const serviceCategories = [
  "Preventive",
  "Restorative",
  "Cosmetic",
  "Surgical",
  "Orthodontics",
  "Prosthetic",
] as const;

export const CreateServiceValidator = z.object({
  image: z.string().trim().min(1, "Image is required."),

  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(255, "Title cannot exceed 255 characters."),

  description: z.string().trim().min(1, "Description is required."),

  price: z.coerce.number().positive("Price must be greater than 0."),

  points: z.coerce
    .number()
    .int("Points must be a whole number.")
    .min(0, "Points cannot be negative.")
    .default(0),

  duration_minutes: z.coerce
    .number()
    .int("Duration must be a whole number.")
    .positive("Duration must be greater than 0."),

  image_public_id: z.string().trim(),

  category: z.enum(serviceCategories),
});

export const UpdateServiceValidator = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().positive().optional(),
  image: z.string().url().optional(),
  points: z.coerce.number().min(1).optional(),
  duration_minutes: z.coerce
    .number()
    .int()
    .min(1, "Duration must be at least 1 minute.")
    .max(480, "Duration cannot exceed 480 minutes.")
    .optional(),
});

export const adminCreateUserValidator = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z.string().optional(),
  role_id: z.number().min(1).max(2),
});
