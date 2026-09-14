"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialValidator = exports.createTestimonialValidator = void 0;
const zod_1 = require("zod");
exports.createTestimonialValidator = zod_1.z.object({
    rating: zod_1.z.coerce
        .number()
        .int("Rating must be a whole number.")
        .min(1, "Rating must be at least 1.")
        .max(5, "Rating cannot exceed 5."),
    testimonial: zod_1.z
        .string()
        .trim()
        .min(10, "Testimonial must be at least 10 characters.")
        .max(2000, "Testimonial cannot exceed 2000 characters."),
});
exports.updateTestimonialValidator = zod_1.z
    .object({
    rating: zod_1.z.coerce
        .number()
        .int("Rating must be a whole number.")
        .min(1, "Rating must be at least 1.")
        .max(5, "Rating cannot exceed 5.")
        .optional(),
    testimonial: zod_1.z
        .string()
        .trim()
        .min(10, "Testimonial must be at least 10 characters.")
        .max(2000, "Testimonial cannot exceed 2000 characters.")
        .optional(),
})
    .refine((data) => data.rating !== undefined || data.testimonial !== undefined, {
    message: "At least one field must be provided for update.",
});
