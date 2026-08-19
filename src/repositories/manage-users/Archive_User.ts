import { pool } from "../../config/db";

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
    RETURNING id, first_name, last_name, email, contact_number, deleted_at
    `,
    [id]
  );

  return result.rows[0];
}
}