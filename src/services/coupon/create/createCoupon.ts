import { ICoupon } from "../../../interfaces/coupon.interface";
import { CreateCouponRepository } from "../../../repositories/manage-coupon/index";

export const createCoupon = async (data: ICoupon) => {
  const couponRepository = new CreateCouponRepository();
  return await couponRepository.create(data);
};