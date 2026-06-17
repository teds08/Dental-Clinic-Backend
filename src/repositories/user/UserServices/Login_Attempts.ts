import { pool } from "../../../config/db";


export class FailedAttemptsUserRepository {
 async incrementFailedAttempts(userId: number) {
  await pool.query(
    `
    UPDATE users
    SET
      failed_login_attempts = failed_login_attempts + 1,
      updated_at = NOW()
    WHERE id = $1
    `,
    [userId]
  );
}
}