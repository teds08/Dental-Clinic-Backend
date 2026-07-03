import { FindAllCouponRepository } from "../../repositories/admin/index";


export class FindAllCouponService {
private repo = new FindAllCouponRepository();

async getCoupons(){
return await this.repo.findAll();
}


}