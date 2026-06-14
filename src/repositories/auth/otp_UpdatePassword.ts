import { pool } from "../../config/db";


export class OtpPasswordUpdateRepository {
    
   async updatePassword(email: string, password: string) {
  await pool.query(
    `
    UPDATE users
    SET password = $1,
        otp_code = NULL,
        otp_expires_at = NULL,
        otp_attempts = 0,
        locked_until = NULL,
        updated_at = NOW()
    WHERE email = $2
    `,
    [password, email]
  );
}
}