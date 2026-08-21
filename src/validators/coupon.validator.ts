import { z } from "zod";

export const createCouponValidator = z
  .object({
    name: z.string().min(3).max(150),

    type: z.enum(["EVENT", "NORMAL"]),

    discount_percent: z.coerce.number().gt(0).lte(100),

    required_points: z.coerce.number().int().min(1).nullable().optional(),

    start_date: z.string().date().nullable().optional(),

    end_date: z.string().date().nullable().optional(),
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
          code: z.ZodIssueCode.custom,

          path: ["required_points"],

          message: "Normal coupons require reward points.",
        });
      }

      // --------------------------------------------------
      // Normal coupons must not have event dates
      // --------------------------------------------------

      if (data.start_date != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["start_date"],

          message: "Normal coupons cannot have a start date.",
        });
      }

      if (data.end_date != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

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
          code: z.ZodIssueCode.custom,

          path: ["required_points"],

          message: "Event coupons cannot require reward points.",
        });
      }

      // --------------------------------------------------
      // Event coupons require a start date
      // --------------------------------------------------

      if (!data.start_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["start_date"],

          message: "Event coupons require a start date.",
        });
      }

      // --------------------------------------------------
      // Event coupons require an end date
      // --------------------------------------------------

      if (!data.end_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

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
            code: z.ZodIssueCode.custom,

            path: ["end_date"],

            message:
              "Event coupon end date must be on or after the start date.",
          });
        }
      }
    }
  });

export const redeemCouponValidator = z.object({
  patient_coupon_id: z.coerce.number().int().positive(),
});
