import { z } from "zod";

export const registerValidator = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.",
    ),
});

export const updateProfileValidator = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(100, "First name cannot exceed 100 characters.")
    .optional(),

  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(100, "Last name cannot exceed 100 characters.")
    .optional(),

  contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.",
    )
    .optional(),

  date_of_birth: z
    .string()
    .date("Date of birth must be a valid date.")
    .optional()
    .nullable(),

  address: z
    .string()
    .trim()
    .max(500, "Address cannot exceed 500 characters.")
    .optional()
    .nullable(),

  gender: z
    .string()
    .trim()
    .max(20, "Gender cannot exceed 20 characters.")
    .optional()
    .nullable(),

  emergency_contact: z
    .string()
    .trim()
    .max(150, "Emergency contact cannot exceed 150 characters.")
    .optional()
    .nullable(),

  emergency_contact_number: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Emergency contact number must be a valid Philippine mobile number.",
    )
    .optional()
    .nullable(),
});
