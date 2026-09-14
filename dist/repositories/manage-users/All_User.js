"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllRepository = void 0;
const db_1 = require("../../config/db");
class FindAllRepository {
    async findAll() {
        const result = await db_1.pool.query(`
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.contact_number,
      u.created_at,
      u.updated_at,
      r.role_name
    FROM users u
    JOIN roles r
      ON u.role_id = r.role_id
    WHERE u.deleted_at IS NULL
    ORDER BY u.id ASC
  `);
        return result.rows;
    }
}
exports.FindAllRepository = FindAllRepository;
