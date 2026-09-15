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

  icon: z
    .string()
    .trim()
    .min(1, "Icon is required.")
    .max(100, "Icon cannot exceed 100 characters."),

  category: z.enum(serviceCategories),
});

export const UpdateServiceValidator = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(255, "Title cannot exceed 255 characters.")
    .optional(),

  description: z.string().trim().min(1, "Description is required.").optional(),

  price: z.coerce.number().positive("Price must be greater than 0.").optional(),

  points: z.coerce
    .number()
    .int("Points must be a whole number.")
    .min(0, "Points cannot be negative.")
    .optional(),

  duration_minutes: z.coerce
    .number()
    .int("Duration must be a whole number.")
    .positive("Duration must be greater than 0.")
    .optional(),

  icon: z
    .string()
    .trim()
    .min(1, "Icon is required.")
    .max(100, "Icon cannot exceed 100 characters.")
    .optional(),

  category: z.enum(serviceCategories).optional(),
});

export const adminCreateUserValidator = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.email(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be less than 64 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    ),

  contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.",
    ),

  role_id: z
    .number()
    .int()
    .refine((value) => value === 1 || value === 2, {
      message: "Role must be either Admin or User.",
    }),

  date_of_birth: z
    .string()
    .regex(
      /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      "Date of birth must be in YYYY/MM/DD format.",
    )
    .refine((val) => {
      const [year, month, day] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Date of birth must be a valid date.")
    .refine((val) => {
      const [year, month, day] = val.split("/").map(Number);

      return new Date(year, month - 1, day) <= new Date();
    }, "Date of birth cannot be in the future."),

  address: z.string().trim().max(500, "Address cannot exceed 500 characters."),

  gender: z.string().trim().max(20, "Gender cannot exceed 20 characters."),

  emergency_contact: z
    .string()
    .trim()
    .max(150, "Emergency contact cannot exceed 150 characters.")
    .optional(),

  emergency_contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Emergency contact number must be a valid Philippine mobile number.",
    )
    .optional(),
});

export const adminUpdateUserValidator = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters.")
    .optional(),

  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .optional(),

  email: z.email("Please provide a valid email address.").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be less than 64 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    )
    .optional(),

  contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.",
    )
    .optional(),

  role_id: z
    .number()
    .int()
    .refine((value) => value === 1 || value === 2, {
      message: "Role must be either Admin or User.",
    })
    .optional(),

  date_of_birth: z
    .string()
    .regex(
      /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      "Date of birth must be in YYYY/MM/DD format.",
    )
    .refine((val) => {
      const [year, month, day] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }, "Date of birth must be a valid date.")
    .refine((val) => {
      const [year, month, day] = val.split("/").map(Number);

      return new Date(year, month - 1, day) <= new Date();
    }, "Date of birth cannot be in the future.")
    .optional(),

  address: z
    .string()
    .trim()
    .max(500, "Address cannot exceed 500 characters.")
    .optional(),

  gender: z
    .string()
    .trim()
    .max(20, "Gender cannot exceed 20 characters.")
    .optional(),

  emergency_contact: z
    .string()
    .trim()
    .max(150, "Emergency contact cannot exceed 150 characters.")
    .optional(),

  emergency_contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Emergency contact number must be a valid Philippine mobile number.",
    )
    .optional(),
});
