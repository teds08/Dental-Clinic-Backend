import { IAdminUpdateCoupon } from "../../interfaces/coupon.interface";
import { UpdateCouponRepository } from "../../repositories/manage-coupon/index";

export class UpdateCouponService {
  private repo = new UpdateCouponRepository();

  async updateCoupon(id: number, data: IAdminUpdateCoupon) {
    const coupon = await this.repo.update(id, data);

    if (!coupon) {
      throw new Error("Coupon not found");
    }

    return coupon;
  }
}
