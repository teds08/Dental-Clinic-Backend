"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindServiceRepository = void 0;
const db_1 = require("../../config/db");
class FindServiceRepository {
    async findById(id) {
        const result = await db_1.pool.query(`
      SELECT
        id,
        image,
        image_public_id,
        title,
        description,
        category,
        price,
        points,
        duration_minutes,
        created_at,
        updated_at
      FROM services
      WHERE id = $1
        AND deleted_at IS NULL
      `, [id]);
        return result.rows[0];
    }
}
exports.FindServiceRepository = FindServiceRepository;
