import { Request, Response } from "express";
import { UpdateCouponService } from "../../../services/coupon/index";

const updateCouponService = new UpdateCouponService();

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await updateCouponService.updateCoupon(id, req.body);

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
