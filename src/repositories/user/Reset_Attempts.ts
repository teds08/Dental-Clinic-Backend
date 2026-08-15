import { pool } from "../../config/db";


export class ResetAttemptsUserRepository {
    async resetLoginAttempts(userId: number) {
  await pool.query(
    `
    UPDATE users
    SET
      failed_login_attempts = 0,
      locked_until = NULL,
      updated_at = NOW()
    WHERE id = $1
    `,
    [userId]
  );
}
}