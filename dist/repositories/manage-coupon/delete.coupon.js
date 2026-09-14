"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCouponRepository = void 0;
const db_1 = require("../../config/db");
class DeleteCouponRepository {
    async delete(id) {
        const result = await db_1.pool.query(`
DELETE FROM coupons
WHERE id=$1
RETURNING *
`, [id]);
        return result.rows[0];
    }
}
exports.DeleteCouponRepository = DeleteCouponRepository;
