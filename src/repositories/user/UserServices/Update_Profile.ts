import { pool } from "../../../config/db";

export class UpdateUserRepository {
    async update(id: number, data: {
  username?: string;
  email?: string;
  password?: string;
  contact_number?: string;
  role_id?: number;
}) {
  const result = await pool.query(
    `UPDATE users
     SET 
       username = COALESCE($1, username),
       email = COALESCE($2, email),
       password = COALESCE($3, password),
       contact_number = COALESCE($4, contact_number),
       role_id = COALESCE($5, role_id),
       updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [
      data.username,
      data.email,
      data.password,
      data.contact_number,
      data.role_id,
      id
    ]
  );

  return result.rows[0];
}
}