"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileRepository = void 0;
const db_1 = require("../../config/db");
class GetProfileRepository {
    async findById(id) {
        const result = await db_1.pool.query(`
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      u.contact_number,
      u.date_of_birth,
      u.address,
      u.gender,
      u.emergency_contact,
      u.emergency_contact_number,
      u.role_id,
      r.role_name,
      u.created_at,
      u.updated_at
    FROM users u
    JOIN roles r
      ON u.role_id = r.role_id
    WHERE u.id = $1
      AND u.deleted_at IS NULL
    `, [id]);
        return result.rows[0];
    }
}
exports.GetProfileRepository = GetProfileRepository;
