import { pool } from "../../config/db";

export class HardDeleteRepository {
   async hardDelete(id: number) {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, username, email
    `,
    [id]
  );

  return result.rows[0];
}
}