import { pool } from "../../config/db";

export class HardDeleteRepository {
   async hardDelete(id: number) {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, first_name, last_name, email, contact_number, deleted_at
    `,
    [id]
  );

  return result.rows[0];
}
}