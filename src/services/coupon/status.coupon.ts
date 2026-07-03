import { CouponStatusRepository } from "../../repositories/admin/index";


export class CouponStatusService {
    
private repo = new CouponStatusRepository();


async changeStatus(id:number,status:boolean)
{
const coupon = await this.repo.updateStatus(id,status);

if(!coupon){
throw new Error("Coupon not found");
}

return coupon;


    }
}