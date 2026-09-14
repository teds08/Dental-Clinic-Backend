"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponRepository = void 0;
const db_1 = require("../../config/db");
class CreateCouponRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(data) {
        const result = await this.db.query(`
        INSERT INTO coupons
        (
          name,
          type,
          discount_percent,
          required_points,
          is_active,
          start_date,
          end_date

        )

        VALUES
        ($1, $2, $3, $4, $5, $6, $7)

        RETURNING *
        `, [
            data.name,
            data.type,
            data.discount_percent,
            data.required_points ?? null,
            data.is_active ?? true,
            data.start_date ?? null,
            data.end_date ?? null
        ]);
        return result.rows[0];
    }
}
exports.CreateCouponRepository = CreateCouponRepository;
