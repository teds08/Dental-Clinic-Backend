"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindActiveCouponRepository = void 0;
const db_1 = require("../../config/db");
class FindActiveCouponRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async findById(couponId) {
        const result = await this.db.query(`
      SELECT * FROM coupons
      WHERE

          id = $1

      AND is_active = TRUE
      AND deleted_at IS NULL
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
      `, [couponId]);
        return result.rows[0];
    }
    async findActiveEventCouponById(couponId) {
        const result = await this.db.query(`
      SELECT * FROM coupons
      WHERE

          id = $1

      AND type = 'EVENT'
      AND is_active = TRUE
      AND deleted_at IS NULL
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
      `, [couponId]);
        return result.rows[0];
    }
    async findActiveNormalCouponById(couponId) {
        const result = await this.db.query(`
      SELECT * FROM coupons
      WHERE

          id = $1

      AND type = 'NORMAL'
      AND is_active = TRUE
      AND deleted_at IS NULL

      `, [couponId]);
        return result.rows[0];
    }
}
exports.FindActiveCouponRepository = FindActiveCouponRepository;
