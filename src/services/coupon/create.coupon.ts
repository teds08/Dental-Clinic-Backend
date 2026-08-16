import { ICoupon } from "../../interfaces/coupon.interface";
import { CreateCouponRepository } from "../../repositories/manage-coupon/index";


export class CreateCouponService {

  private couponRepository = new CreateCouponRepository();


  async createCoupon(data: ICoupon) {

    // --------------------------------------------------
    // 1. Validate coupon type
    // --------------------------------------------------

    if (
      data.type !== "EVENT" &&
      data.type !== "NORMAL"
    ) {

      throw new Error(
        "Invalid coupon type."
      );

    }


    // ==================================================
    // NORMAL COUPON
    // ==================================================

    if (
      data.type === "NORMAL"
    ) {

      // --------------------------------------------------
      // Normal coupons require reward points
      // --------------------------------------------------

      if (
        data.required_points === null ||
        data.required_points === undefined
      ) {

        throw new Error(
          "Normal coupons require reward points."
        );

      }


      // --------------------------------------------------
      // Normal coupons cannot have event dates
      // --------------------------------------------------

      if (
        data.start_date !== null &&
        data.start_date !== undefined
      ) {

        throw new Error(
          "Normal coupons cannot have a start date."
        );

      }


      if (
        data.end_date !== null &&
        data.end_date !== undefined
      ) {

        throw new Error(
          "Normal coupons cannot have an end date."
        );

      }

    }


    // ==================================================
    // EVENT COUPON
    // ==================================================

    if (
      data.type === "EVENT"
    ) {

      // --------------------------------------------------
      // Event coupons cannot require reward points
      // --------------------------------------------------

      if (
        data.required_points !== null &&
        data.required_points !== undefined
      ) {

        throw new Error(
          "Event coupons cannot require reward points."
        );

      }


      // --------------------------------------------------
      // Event coupons require a start date
      // --------------------------------------------------

      if (
        !data.start_date
      ) {

        throw new Error(
          "Event coupons require a start date."
        );

      }


      // --------------------------------------------------
      // Event coupons require an end date
      // --------------------------------------------------

      if (
        !data.end_date
      ) {

        throw new Error(
          "Event coupons require an end date."
        );

      }


      // --------------------------------------------------
      // Check date order
      // --------------------------------------------------

      const startDate =
        new Date(
          data.start_date
        );


      const endDate =
        new Date(
          data.end_date
        );


      if (
        startDate > endDate
      ) {

        throw new Error(
          "Event coupon end date must be on or after the start date."
        );

      }

    }


    // --------------------------------------------------
    // 2. Create coupon
    // --------------------------------------------------

    const coupon = await this.couponRepository.create(data);


    // --------------------------------------------------
    // 3. Return created coupon
    // --------------------------------------------------

    return coupon;

  }

}