"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserRepository = void 0;
const db_1 = require("../../config/db");
class RestoreUserRepository {
    async restore(id) {
        const result = await db_1.pool.query(`
    UPDATE users
    SET
      deleted_at = NULL,
      updated_at = NOW()
    WHERE id = $1
      AND deleted_at IS NOT NULL
    RETURNING
      id,
      first_name,
      last_name,
      updated_at
    `, [id]);
        return result.rows[0];
    }
}
exports.RestoreUserRepository = RestoreUserRepository;
