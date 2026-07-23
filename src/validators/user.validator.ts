import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  contact_number: z.string().regex(
      /^09\d{9}$/,
      "Contact number must be a valid Philippine mobile number.")
});