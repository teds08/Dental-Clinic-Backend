import { Request, Response } from "express";
import {CreateCouponService, FindAllCouponService, UpdateCouponService, CouponStatusService, DeleteCouponService, RedeemCouponService} from "../services/coupon/index";
import {createCouponValidator, redeemCouponValidator} from "../validators/coupon.validator";
import { AuthRequest } from "../middlewares/auth.middleware";


const createCouponService = new CreateCouponService();
const findAllCouponService = new FindAllCouponService();
const updateCouponService = new UpdateCouponService();
const couponStatusService = new CouponStatusService();
const deleteCouponService = new DeleteCouponService();
const redeemCouponService = new RedeemCouponService();


export class CouponController{

async createCoupon(req:Request,res:Response){


try{


const validated = createCouponValidator.parse(req.body);



const coupon =
await createCouponService.createCoupon(
validated
);

return res.status(201).json({
message:"Coupon created successfully",
data:coupon

});

}
catch(error:any){


return res.status(400).json({
message:error.message
});

        }
    }

async getAllCoupons(req: Request, res: Response){

try{
const coupons = await findAllCouponService.getCoupons();

return res.status(200).json({
message:"Coupons fetched successfully",
data:coupons

});
}
catch(error:any){
return res.status(500).json({message:error.message});
      }


    }

async updateCoupon(req:Request, res:Response){

try{
const id = Number(req.params.id);
const result = await updateCouponService.updateCoupon(id, req.body);


return res.status(200).json({
message:"Coupon updated successfully",
data:result

});

}
catch(error:any){
return res.status(400).json({
message:error.message
});

    }


}

async updateCouponStatus(req:Request,res:Response){
try{
const id = Number(req.params.id);
const {is_active} = req.body;
const result = await couponStatusService.changeStatus(id,is_active);

return res.json({
message:"Coupon status updated",
data:result
});

}
catch(error:any){
return res.status(400).json({message:error.message});
        }
    }

async deleteCoupon(req:Request,res:Response){

try{
    
const id = Number(req.params.id);
const result = await deleteCouponService.deleteCoupon(id);


return res.json({

message:"Coupon deleted successfully",
data:result

});


}
catch(error:any){

return res.status(400).json({message:error.message});

        }
    }

async redeemCoupon(req: AuthRequest, res: Response) {

  try {

    const validated = redeemCouponValidator.parse(req.body);
    const userId = req.user.id;

    
    await redeemCouponService.redeem(userId, validated.patient_coupon_id);

    return res.status(200).json({

      message:
        "Coupon redeemed successfully."

    });

  } catch (error: any) {

    return res.status(400).json({

      message:
        error.message

    });

  }

}

}