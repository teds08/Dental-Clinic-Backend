import { pool } from "../../config/db";

export class UpdateUserRepository {
    async update(id: number, data: {
  first_name?: string;
  last_name?: string;
  email?: string;
  contact_number?: string;
  role_id?: number;
}) {
  const result = await pool.query(
    `UPDATE users
     SET 
       first_name = COALESCE($1, first_name),
       last_name = COALESCE($2, last_name),
       email = COALESCE($3, email),
       contact_number = COALESCE($4, contact_number),
       role_id = COALESCE($5, role_id),
       updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [
      data.first_name,
      data.last_name,
      data.email,
      data.contact_number,
      data.role_id,
      id
    ]
  );

  return result.rows[0];
}
}