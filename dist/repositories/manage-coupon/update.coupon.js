"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponRepository = void 0;
const db_1 = require("../../config/db");
class UpdateCouponRepository {
    async update(id, data) {
        const result = await db_1.pool.query(`
UPDATE coupons
SET
name = COALESCE($1,name),
type = COALESCE($2,type),
discount_percent = COALESCE($3,discount_percent),
required_points = COALESCE($4,required_points),
updated_at = NOW()

WHERE id = $5
RETURNING *
`, [
            data.name,
            data.type,
            data.discount_percent,
            data.required_points,
            id
        ]);
        return result.rows[0];
    }
}
exports.UpdateCouponRepository = UpdateCouponRepository;
