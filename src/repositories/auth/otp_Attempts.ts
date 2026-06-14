import { pool } from "../../config/db";


export class OtpAttemptsRepository {
 
   async incrementOtpAttempts(email: string) {
  await pool.query(
    `
    UPDATE users
    SET otp_attempts = otp_attempts + 1
    WHERE email = $1
    `,
    [email]
  );
}
}