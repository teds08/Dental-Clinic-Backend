"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStatusRepository = void 0;
const db_1 = require("../../config/db");
class CouponStatusRepository {
    async updateStatus(id, status) {
        const result = await db_1.pool.query(`
UPDATE coupons
SET
is_active = $1,
updated_at = NOW()
WHERE id = $2
RETURNING *
`, [status, id]);
        return result.rows[0];
    }
}
exports.CouponStatusRepository = CouponStatusRepository;
