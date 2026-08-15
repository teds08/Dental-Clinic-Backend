import { pool } from "../../config/db";


export class FindAllCouponRepository {


  async findAll() {


    const result = await pool.query(

      `
      SELECT
        id,
        name,
        type,
        discount_percent,
        required_points,
        is_active,
        created_at,
        updated_at

      FROM coupons
      ORDER BY created_at DESC
      `

    );


    return result.rows;

  }


}