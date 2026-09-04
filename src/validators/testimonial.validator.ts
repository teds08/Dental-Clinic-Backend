import { z } from "zod";

export const createTestimonialValidator = z.object({
  rating: z.coerce
    .number()
    .int("Rating must be a whole number.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),

  testimonial: z
    .string()
    .trim()
    .min(10, "Testimonial must be at least 10 characters.")
    .max(2000, "Testimonial cannot exceed 2000 characters."),
});

export const updateTestimonialValidator = z
  .object({
    rating: z.coerce
      .number()
      .int("Rating must be a whole number.")
      .min(1, "Rating must be at least 1.")
      .max(5, "Rating cannot exceed 5.")
      .optional(),

    testimonial: z
      .string()
      .trim()
      .min(10, "Testimonial must be at least 10 characters.")
      .max(2000, "Testimonial cannot exceed 2000 characters.")
      .optional(),
  })
  .refine(
    (data) => data.rating !== undefined || data.testimonial !== undefined,
    {
      message: "At least one field must be provided for update.",
    },
  );
