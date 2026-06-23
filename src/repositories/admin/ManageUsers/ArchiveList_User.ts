import { pool } from "../../../config/db";

export class FindArchiveUsersRepository {

  async findArchivedUsers() {

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.username,
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
      `
    );

    return result.rows;
  }

}