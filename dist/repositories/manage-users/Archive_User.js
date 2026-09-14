"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteRepository = void 0;
const db_1 = require("../../config/db");
class SoftDeleteRepository {
    async softDelete(id) {
        const result = await db_1.pool.query(`
    UPDATE users
    SET
      deleted_at = NOW(),
      updated_at = NOW()
    WHERE id = $1
      AND deleted_at IS NULL
    RETURNING id, first_name, deleted_at
    `, [id]);
        return result.rows[0];
    }
}
exports.SoftDeleteRepository = SoftDeleteRepository;
