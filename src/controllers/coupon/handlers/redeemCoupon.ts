import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { RedeemCouponService } from "../../../services/coupon/index";
import { redeemCouponValidator } from "../../../validators/coupon.validator";

const redeemCouponService = new RedeemCouponService();

export const redeemCoupon = async (req: AuthRequest, res: Response) => {
  try {
    const validated = redeemCouponValidator.parse(req.body);
    const userId = req.user.id;

    await redeemCouponService.redeem(userId, validated.patient_coupon_id);

    return res.status(200).json({
      message: "Coupon redeemed successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
