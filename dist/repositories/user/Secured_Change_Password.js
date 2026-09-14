"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedPasswordChangeRepository = void 0;
const db_1 = require("../../config/db");
class AuthenticatedPasswordChangeRepository {
    async savePasswordChangeOTP(id, otp, expiresAt) {
        await db_1.pool.query(`
    UPDATE users
    SET
      otp_code = $1,
      otp_expires_at = $2,
      otp_attempts = 0,
      password_change_verified = FALSE
    WHERE id = $3
    `, [otp, expiresAt, id]);
    }
    async verifyPasswordChangeOTP(id) {
        await db_1.pool.query(`
    UPDATE users
    SET password_change_verified = TRUE
    WHERE id = $1
    `, [id]);
    }
    async clearPasswordChangeVerification(id) {
        await db_1.pool.query(`
    UPDATE users
    SET
      password_change_verified = FALSE,
      otp_code = NULL,
      otp_expires_at = NULL,
      otp_attempts = 0
    WHERE id = $1
    `, [id]);
    }
    async updatePassword(userId, hashedPassword) {
        const result = await db_1.pool.query(`
      UPDATE users
      SET
        password = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING id, first_name, last_name, updated_at
      `, [hashedPassword, userId]);
        return result.rows[0];
    }
    async updatePasswordChangeOTP(userId, otp, otpExpiresAt, resendAvailableAt) {
        await db_1.pool.query(`
    UPDATE users
    SET
      otp_code = $1,
      otp_expires_at = $2,
      otp_attempts = 0,
      password_change_verified = FALSE,
      otp_resend_available_at = $3
    WHERE id = $4
    `, [otp, otpExpiresAt, resendAvailableAt, userId]);
    }
}
exports.AuthenticatedPasswordChangeRepository = AuthenticatedPasswordChangeRepository;
