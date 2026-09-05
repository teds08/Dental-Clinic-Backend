import { Request, Response } from "express";
import { FindAllCouponService } from "../../../services/coupon/index";

const findAllCouponService = new FindAllCouponService();

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await findAllCouponService.getCoupons();

    return res.status(200).json({
      message: "Coupons fetched successfully",
      data: coupons,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
