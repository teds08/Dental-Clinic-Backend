import { Request, Response } from "express";
import { CouponStatusService } from "../../../services/coupon/index";

const couponStatusService = new CouponStatusService();

export const updateCouponStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { is_active } = req.body;

    const result = await couponStatusService.changeStatus(id, is_active);

    return res.status(200).json({
      message: "Coupon status updated",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
