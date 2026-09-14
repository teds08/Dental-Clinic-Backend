"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindArchiveUsersRepository = void 0;
const db_1 = require("../../config/db");
class FindArchiveUsersRepository {
    async findArchivedUsers() {
        const result = await db_1.pool.query(`
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.contact_number,
        u.role_id,
        r.role_name,
        u.created_at,
        u.updated_at,
        u.deleted_at
      FROM users u
      JOIN roles r
        ON u.role_id = r.role_id
      WHERE u.deleted_at IS NOT NULL
      ORDER BY u.deleted_at DESC
      `);
        return result.rows;
    }
}
exports.FindArchiveUsersRepository = FindArchiveUsersRepository;
