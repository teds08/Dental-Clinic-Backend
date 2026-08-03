import { z } from "zod";

export const createCouponValidator = z.object({

    name: z.string().min(3).max(150),
    type: z.enum(["EVENT","NORMAL"]),
    discount_percent: z.coerce.number().gt(0).lte(100),
    required_points: z.coerce.number().int().min(1).nullable().optional(),
    start_date: z.string().date().nullable().optional(),
    end_date: z.string().date().nullable().optional()

  })

  .superRefine((data, ctx) => {

    if (
      data.type === "NORMAL" &&
      data.required_points == null
    ) {

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["required_points"],
        message: "Normal coupons require reward points."

      });

    }

    if (data.type === "EVENT") {

      if (!data.start_date) {
        ctx.addIssue({code: z.ZodIssueCode.custom,
          path: ["start_date"],
          message: "Event coupons require a start date."

        });

      }

      if (!data.end_date) {
        ctx.addIssue({code: z.ZodIssueCode.custom,
          path: ["end_date"],
          message: "Event coupons require an end date."

        });

      }

    }

  });


export const redeemCouponValidator = z.object({

  patient_coupon_id: z.coerce
    .number()
    .int()
    .positive()

});