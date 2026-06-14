import { pool } from "../../config/db";


export class CreateSessionRepository {
 
   async createSession(sessionId: string, email: string, expiresAt: Date) {
  await pool.query(
    `
    INSERT INTO password_reset_sessions (
      session_id,
      email,
      expires_at,
      otp_verified
    )
    VALUES ($1, $2, $3, FALSE)
    `,
    [sessionId, email, expiresAt]
  );
}
}