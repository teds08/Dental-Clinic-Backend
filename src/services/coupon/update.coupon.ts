import { UpdateCouponRepository } from "../../repositories/admin/index";


export class UpdateCouponService {
private repo = new UpdateCouponRepository();


async updateCoupon(id:number,data:any){


const coupon = await this.repo.update(id,data);

if(!coupon){
throw new Error("Coupon not found");

        }

return coupon;


    }


}