import { pool } from "../../../config/db";

export class SoftDeleteRepository {
   async softDelete(id: number) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      deleted_at = NOW(),
      updated_at = NOW()
    WHERE id = $1
      AND deleted_at IS NULL
    RETURNING id, username, email
    `,
    [id]
  );

  return result.rows[0];
}
}