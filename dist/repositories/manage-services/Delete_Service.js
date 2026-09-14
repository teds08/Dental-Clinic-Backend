"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePermanentRepository = void 0;
const db_1 = require("../../config/db");
class DeletePermanentRepository {
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
        updated_at,
        deleted_at
      FROM services
      WHERE id = $1
      `, [id]);
        return result.rows[0];
    }
    async delete(id) {
        const result = await db_1.pool.query(`
      DELETE FROM services
      WHERE id = $1
      RETURNING *
      `, [id]);
        return result.rows[0];
    }
}
exports.DeletePermanentRepository = DeletePermanentRepository;
