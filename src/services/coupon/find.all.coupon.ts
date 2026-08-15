import { FindAllCouponRepository } from "../../repositories/manage-coupon/index";


export class FindAllCouponService {
private repo = new FindAllCouponRepository();

async getCoupons(){
return await this.repo.findAll();
}


}