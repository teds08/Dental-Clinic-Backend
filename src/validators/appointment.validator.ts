import { z } from "zod";

export const createAppointmentValidator = z.object({

  service_id: z.coerce.number().int().positive(),
  patient_name: z.string().trim()
    .min(2, "Patient name must be at least 2 characters.")
    .max(150, "Patient name cannot exceed 150 characters."),
  age: z.coerce.number().int()
    .min(0, "Age cannot be negative.")
    .max(120, "Invalid age."),
  contact_number: z.string()
    .regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number."),
  appointment_date: z.string()
    .date("Invalid appointment date."),
  appointment_time: z.string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Time must be in HH:mm format."),
  patient_coupon_id: z.coerce.number().int().positive().nullable().optional()

});