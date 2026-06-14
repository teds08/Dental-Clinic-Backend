import { pool } from "../../config/db";


export class FindEmailUserRepository {
   
  async findByEmail(email: string) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
    [email]
  );

  return result.rows[0];
}

}