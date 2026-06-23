import { pool } from "../../../config/db";

export class FindAllRepository {
   async findAll() {
  const result = await pool.query(`
    SELECT
      u.id,
      u.username,
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