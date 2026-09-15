import { Request, Response } from "express";
import { UpdateCouponService } from "../../../services/coupon/index";
import { updateCouponValidator } from "../../../validators/coupon.validator";

const updateCouponService = new UpdateCouponService();

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid coupon ID.",
      });
    }

    const validated = updateCouponValidator.parse(req.body);

    const result = await updateCouponService.updateCoupon(id, validated);

    return res.status(200).json({
      message: "Coupon updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
