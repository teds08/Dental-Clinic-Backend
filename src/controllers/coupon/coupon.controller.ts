import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { createCoupon } from "./handlers/createCoupon";
import { getAllCoupons } from "./handlers/getAllCoupons";
import { updateCoupon } from "./handlers/updateCoupon";
import { updateCouponStatus } from "./handlers/updateCouponStatus";
import { deleteCoupon } from "./handlers/deleteCoupon";
import { redeemCoupon } from "./handlers/redeemCoupon";

export class CouponController {
  async createCoupon(req: Request, res: Response) {
    return createCoupon(req, res);
  }

  async getAllCoupons(req: Request, res: Response) {
    return getAllCoupons(req, res);
  }

  async updateCoupon(req: Request, res: Response) {
    return updateCoupon(req, res);
  }

  async updateCouponStatus(req: Request, res: Response) {
    return updateCouponStatus(req, res);
  }

  async deleteCoupon(req: Request, res: Response) {
    return deleteCoupon(req, res);
  }

  async redeemCoupon(req: AuthRequest, res: Response) {
    return redeemCoupon(req, res);
  }
}
