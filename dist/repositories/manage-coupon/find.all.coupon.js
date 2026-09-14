"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllCouponRepository = void 0;
const db_1 = require("../../config/db");
class FindAllCouponRepository {
    async findAll() {
        const result = await db_1.pool.query(`
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
      `);
        return result.rows;
    }
}
exports.FindAllCouponRepository = FindAllCouponRepository;
