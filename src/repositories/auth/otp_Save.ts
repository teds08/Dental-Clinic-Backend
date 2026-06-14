import { pool } from "../../config/db";


export class SaveOtpRepository {
 
  async saveOTP(email: string, otp: string, expires: Date) {
  await pool.query(
    `
    UPDATE users
    SET otp_code = $1,
        otp_expires_at = $2,
        otp_attempts = 0
    WHERE email = $3
    `,
    [otp, expires, email]
  );
}
}