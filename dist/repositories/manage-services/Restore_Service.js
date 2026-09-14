"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreServiceRepository = void 0;
const db_1 = require("../../config/db");
class RestoreServiceRepository {
    async restore(id) {
        const result = await db_1.pool.query(`
      UPDATE services
      SET deleted_at = NULL,
          updated_at = NOW()
      WHERE id = $1
      AND deleted_at IS NOT NULL
      RETURNING *
      `, [id]);
        return result.rows[0];
    }
}
exports.RestoreServiceRepository = RestoreServiceRepository;
