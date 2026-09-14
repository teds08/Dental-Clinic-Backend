"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteServiceRepository = void 0;
const db_1 = require("../../config/db");
class SoftDeleteServiceRepository {
    async softDelete(id) {
        const result = await db_1.pool.query(`
      UPDATE services
      SET deleted_at = NOW(),
          updated_at = NOW()
      WHERE id = $1
      AND deleted_at IS NULL
      RETURNING *
      `, [id]);
        return result.rows[0];
    }
}
exports.SoftDeleteServiceRepository = SoftDeleteServiceRepository;
