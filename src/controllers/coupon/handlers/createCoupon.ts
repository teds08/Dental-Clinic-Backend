import { Request, Response } from "express";
import { CreateCouponService } from "../../../services/coupon/index";
import { createCouponValidator } from "../../../validators/coupon.validator";

const createCouponService = new CreateCouponService();

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const validated = createCouponValidator.parse(req.body);

    const coupon = await createCouponService.createCoupon(validated);

    return res.status(201).json({
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
