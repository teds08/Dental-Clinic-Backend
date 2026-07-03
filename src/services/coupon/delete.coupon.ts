import { DeleteCouponRepository } from "../../repositories/admin/index";


export class DeleteCouponService {
private repo = new DeleteCouponRepository();

async deleteCoupon(id:number){
const coupon = await this.repo.delete(id);

if(!coupon){
throw new Error("Coupon not found");

}
return coupon;


    }

}