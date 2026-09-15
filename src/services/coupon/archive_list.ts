import { FindArchivedCouponRepository } from "../../repositories/manage-coupon/index";

export class FindArchivedCouponService {
  private repo = new FindArchivedCouponRepository();

  async findAllArchivedCoupons() {
    return await this.repo.findAll();
  }
}
