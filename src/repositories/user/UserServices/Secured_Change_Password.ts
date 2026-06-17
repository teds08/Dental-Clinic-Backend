import { pool } from "../../../config/db";


export class AuthenticatedPasswordChangeRepository {
   
  async savePasswordChangeOTP( id: number, otp: string, expiresAt: Date) {
  await pool.query(
    `
    UPDATE users
    SET
      otp_code = $1,
      otp_expires_at = $2,
      otp_attempts = 0,
      password_change_verified = FALSE
    WHERE id = $3
    `,
    [otp, expiresAt, id]
  );
}


 async verifyPasswordChangeOTP(id: number) {
  await pool.query(
    `
    UPDATE users
    SET password_change_verified = TRUE
    WHERE id = $1
    `,
    [id]
  );
}


 async clearPasswordChangeVerification(id: number) {
  await pool.query(
    `
    UPDATE users
    SET
      password_change_verified = FALSE,
      otp_code = NULL,
      otp_expires_at = NULL,
      otp_attempts = 0
    WHERE id = $1
    `,
    [id]
  );
}


 async updatePassword(userId: number,hashedPassword: string) {
    const result = await pool.query(
      `
      UPDATE users
      SET
        password = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING id, username, email
      `,
      [hashedPassword, userId]
    );

    return result.rows[0];
  }

  
  async updatePasswordChangeOTP(
  userId: number,
  otp: string,
  otpExpiresAt: Date,
  resendAvailableAt: Date
) {
  await pool.query(
    `
    UPDATE users
    SET
      otp_code = $1,
      otp_expires_at = $2,
      otp_attempts = 0,
      password_change_verified = FALSE,
      otp_resend_available_at = $3
    WHERE id = $4
    `,
    [
      otp,
      otpExpiresAt,
      resendAvailableAt,
      userId
    ]
  );
}


}