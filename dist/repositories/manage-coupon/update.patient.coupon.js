"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientCouponRepository = void 0;
const db_1 = require("../../config/db");
class UpdatePatientCouponRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async markAsUsed(patientCouponId) {
        const result = await this.db.query(`
                UPDATE patient_coupons
                SET
                    status = 'USED',
                    used_at = NOW(),
                    updated_at = NOW()
                WHERE
                    id = $1
                RETURNING *
                `, [patientCouponId]);
        return result.rows[0];
    }
    async markAsUnused(patientCouponId) {
        const result = await this.db.query(`
            UPDATE patient_coupons

            SET
                status = 'UNUSED',
                used_at = NULL,
                updated_at = NOW()

            WHERE
                id = $1
                AND status = 'USED'
                AND deleted_at IS NULL

            RETURNING *
            `, [
            patientCouponId
        ]);
        return result.rows[0];
    }
}
exports.UpdatePatientCouponRepository = UpdatePatientCouponRepository;
