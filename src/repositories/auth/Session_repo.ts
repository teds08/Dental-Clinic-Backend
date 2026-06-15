import { pool } from "../../config/db";


export class SessionRepository {

   
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




    
     async deleteSession(sessionId: string) {
  await pool.query(
    `
    DELETE FROM password_reset_sessions
    WHERE session_id = $1
    `,
    [sessionId]
  );
}



    async deleteSessionsByEmail(email: string) {
  await pool.query(
    `
    DELETE FROM password_reset_sessions
    WHERE email = $1
    `,
    [email]
  );
}






}