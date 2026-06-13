import { pool } from "../../config/db";


export class LockUserRepository {
 async lockAccount(userId: number) {
  await pool.query(
    `
    UPDATE users
    SET
      locked_until = NOW() + INTERVAL '5 minutes',
      updated_at = NOW()
    WHERE id = $1
    `,
    [userId]
  );
}
}