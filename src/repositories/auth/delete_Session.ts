import { pool } from "../../config/db";


export class DeleteSessionRepository {
 
   async deleteSession(sessionId: string) {
  await pool.query(
    `
    DELETE FROM password_reset_sessions
    WHERE session_id = $1
    `,
    [sessionId]
  );
}
}