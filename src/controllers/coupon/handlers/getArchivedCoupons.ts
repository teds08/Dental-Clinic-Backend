import { Request, Response } from "express";
import { FindArchivedCouponService } from "../../../services/coupon/index";

const findArchivedCouponService = new FindArchivedCouponService();

export const getArchivedCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await findArchivedCouponService.findAllArchivedCoupons();

    return res.status(200).json({
      message: "Archived coupons retrieved successfully",
      data: coupons,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
