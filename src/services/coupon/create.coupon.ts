import { CreateCouponRepository } from "../../repositories/manage-coupon/index";


export class CreateCouponService {
private repo = new CreateCouponRepository();

async createCoupon(data:any){
return await this.repo.create(data);
}


}