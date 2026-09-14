"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemCouponValidator = exports.createCouponValidator = void 0;
const zod_1 = require("zod");
exports.createCouponValidator = zod_1.z
    .object({
    name: zod_1.z.string().min(3).max(150),
    type: zod_1.z.enum(["EVENT", "NORMAL"]),
    discount_percent: zod_1.z.coerce.number().gt(0).lte(100),
    required_points: zod_1.z.coerce.number().int().min(1).nullable().optional(),
    start_date: zod_1.z.string().date().nullable().optional(),
    end_date: zod_1.z.string().date().nullable().optional(),
})
    .superRefine((data, ctx) => {
    // ==================================================
    // NORMAL COUPON
    // ==================================================
    if (data.type === "NORMAL") {
        // --------------------------------------------------
        // Normal coupons require reward points
        // --------------------------------------------------
        if (data.required_points == null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["required_points"],
                message: "Normal coupons require reward points.",
            });
        }
        // --------------------------------------------------
        // Normal coupons must not have event dates
        // --------------------------------------------------
        if (data.start_date != null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["start_date"],
                message: "Normal coupons cannot have a start date.",
            });
        }
        if (data.end_date != null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["end_date"],
                message: "Normal coupons cannot have an end date.",
            });
        }
    }
    // ==================================================
    // EVENT COUPON
    // ==================================================
    if (data.type === "EVENT") {
        // --------------------------------------------------
        // Event coupons cannot require reward points
        // --------------------------------------------------
        if (data.required_points != null) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["required_points"],
                message: "Event coupons cannot require reward points.",
            });
        }
        // --------------------------------------------------
        // Event coupons require a start date
        // --------------------------------------------------
        if (!data.start_date) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["start_date"],
                message: "Event coupons require a start date.",
            });
        }
        // --------------------------------------------------
        // Event coupons require an end date
        // --------------------------------------------------
        if (!data.end_date) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["end_date"],
                message: "Event coupons require an end date.",
            });
        }
        // --------------------------------------------------
        // Event coupon end date cannot be before
        // the start date
        // --------------------------------------------------
        if (data.start_date && data.end_date) {
            const startDate = new Date(data.start_date);
            const endDate = new Date(data.end_date);
            if (startDate > endDate) {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    path: ["end_date"],
                    message: "Event coupon end date must be on or after the start date.",
                });
            }
        }
    }
});
exports.redeemCouponValidator = zod_1.z.object({
    patient_coupon_id: zod_1.z.coerce.number().int().positive(),
});
