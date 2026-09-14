"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPatientCouponRepository = void 0;
const db_1 = require("../../config/db");
class FindPatientCouponRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async findById(patientCouponId) {
        const result = await this.db.query(`
        SELECT

          pc.id,
          pc.user_id,
          pc.patient_coupon_id,
          pc.status,
          pc.redeemed_at,
          pc.used_at,
          pc.created_at,
          pc.updated_at,
          pc.deleted_at,

          c.name,
          c.type,
          c.discount_percent,
          c.required_points,
          c.is_active,
          c.start_date,
          c.end_date

        FROM patient_coupons pc

        INNER JOIN coupons c
          ON c.id = pc.patient_coupon_id

        WHERE
          pc.id = $1

        AND pc.deleted_at IS NULL

        LIMIT 1
        `, [
            patientCouponId
        ]);
        return result.rows[0];
    }
}
exports.FindPatientCouponRepository = FindPatientCouponRepository;
