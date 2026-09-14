"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCreateUserValidator = exports.UpdateServiceValidator = exports.CreateServiceValidator = void 0;
const zod_1 = require("zod");
const serviceCategories = [
    "Preventive",
    "Restorative",
    "Cosmetic",
    "Surgical",
    "Orthodontics",
    "Prosthetic",
];
exports.CreateServiceValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(255, "Title cannot exceed 255 characters."),
    description: zod_1.z.string().trim().min(1, "Description is required."),
    price: zod_1.z.coerce.number().positive("Price must be greater than 0."),
    points: zod_1.z.coerce
        .number()
        .int("Points must be a whole number.")
        .min(0, "Points cannot be negative.")
        .default(0),
    duration_minutes: zod_1.z.coerce
        .number()
        .int("Duration must be a whole number.")
        .positive("Duration must be greater than 0."),
    icon: zod_1.z
        .string()
        .trim()
        .min(1, "Icon is required.")
        .max(100, "Icon cannot exceed 100 characters."),
    category: zod_1.z.enum(serviceCategories),
});
exports.UpdateServiceValidator = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(255, "Title cannot exceed 255 characters.")
        .optional(),
    description: zod_1.z.string().trim().min(1, "Description is required.").optional(),
    price: zod_1.z.coerce.number().positive("Price must be greater than 0.").optional(),
    points: zod_1.z.coerce
        .number()
        .int("Points must be a whole number.")
        .min(0, "Points cannot be negative.")
        .optional(),
    duration_minutes: zod_1.z.coerce
        .number()
        .int("Duration must be a whole number.")
        .positive("Duration must be greater than 0.")
        .optional(),
    icon: zod_1.z
        .string()
        .trim()
        .min(1, "Icon is required.")
        .max(100, "Icon cannot exceed 100 characters.")
        .optional(),
    category: zod_1.z.enum(serviceCategories).optional(),
});
exports.adminCreateUserValidator = zod_1.z.object({
    first_name: zod_1.z.string().min(3),
    last_name: zod_1.z.string().min(3),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(8),
    contact_number: zod_1.z.string().optional(),
    role_id: zod_1.z.number().min(1).max(2),
});
