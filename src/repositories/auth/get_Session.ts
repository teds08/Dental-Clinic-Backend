import { pool } from "../../config/db";


export class GetSessionRepository {
 
   async getSession(sessionId: string) {
  const result = await pool.query(
    `
    SELECT * FROM password_reset_sessions
    WHERE session_id = $1
    `,
    [sessionId]
  );

  return result.rows[0];
}
}