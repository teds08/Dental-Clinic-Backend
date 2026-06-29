import { z } from "zod";


export const createCouponValidator = z.object({

    name: z.string().min(3),
    type: z.enum(["EVENT","NORMAL"]),
    discount_percent: z.number().min(1).max(100),
    required_points: z.number().min(0).optional()
});