import { pool } from "../../config/db";

export class FindAllRepository {
  async findAll() {
    const result = await pool.query(`
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
