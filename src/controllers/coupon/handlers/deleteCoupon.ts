import { Request, Response } from "express";
import { DeleteCouponService } from "../../../services/coupon/index";

const deleteCouponService = new DeleteCouponService();

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteCouponService.deleteCoupon(id);

    return res.status(200).json({
      message: "Coupon deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
