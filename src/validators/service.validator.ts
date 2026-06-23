import { z } from "zod";

export const ServiceValidator = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  image: z.string().url(),
  image_public_id: z.string().min(1)
});