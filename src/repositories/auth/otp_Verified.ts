import { pool } from "../../config/db";


export class MarkOtpVerifiedRepository {
    
    async verifySession(sessionId: string) {
  await pool.query(
    `
    UPDATE password_reset_sessions
    SET otp_verified = TRUE
    WHERE session_id = $1
    `,
    [sessionId]
  );
}
   
}