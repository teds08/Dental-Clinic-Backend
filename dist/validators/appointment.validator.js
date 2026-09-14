"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentValidator = void 0;
const zod_1 = require("zod");
exports.createAppointmentValidator = zod_1.z
    .object({
    service_id: zod_1.z.coerce.number().int().positive(),
    first_name: zod_1.z
        .string()
        .trim()
        .min(2, "Patient name must be at least 2 characters.")
        .max(150, "Patient name cannot exceed 150 characters."),
    last_name: zod_1.z
        .string()
        .trim()
        .min(2, "Patient name must be at least 2 characters.")
        .max(150, "Patient name cannot exceed 150 characters."),
    age: zod_1.z.coerce
        .number()
        .int()
        .min(0, "Age cannot be negative.")
        .max(120, "Invalid age."),
    contact_number: zod_1.z
        .string()
        .regex(/^09\d{9}$/, "Contact number must be a valid Philippine mobile number."),
    appointment_date: zod_1.z.string().date("Invalid appointment date."),
    appointment_time: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format."),
    doctor_notes: zod_1.z
        .string()
        .trim()
        .max(1000, "Notes for the doctor cannot exceed 1000 characters.")
        .nullable()
        .optional(),
    /**
     * Used when applying a NORMAL coupon
     * from the patient's coupon inventory.
     */
    patient_coupon_id: zod_1.z.coerce.number().int().positive().nullable().optional(),
    /**
     * Used when applying an EVENT coupon.
     */
    coupon_id: zod_1.z.coerce.number().int().positive().nullable().optional(),
})
    .superRefine((data, ctx) => {
    /**
     * A patient cannot submit both a NORMAL
     * coupon and an EVENT coupon for the
     * same appointment.
     */
    if (data.patient_coupon_id !== null &&
        data.patient_coupon_id !== undefined &&
        data.coupon_id !== null &&
        data.coupon_id !== undefined) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["coupon_id"],
            message: "Only one coupon can be used per appointment.",
        });
    }
});
