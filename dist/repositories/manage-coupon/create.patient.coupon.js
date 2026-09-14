"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePatientCouponRepository = void 0;
const db_1 = require("../../config/db");
class CreatePatientCouponRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(data) {
        const result = await this.db.query(`
                INSERT INTO patient_coupons
                (user_id, patient_coupon_id)

                VALUES($1, $2)
                
                RETURNING *
                `, [data.user_id, data.coupon_id]);
        return result.rows[0];
    }
}
exports.CreatePatientCouponRepository = CreatePatientCouponRepository;
