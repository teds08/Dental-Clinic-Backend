"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRepository = void 0;
const db_1 = require("../../config/db");
class ForgotPasswordRepository {
    // Increment OTP attempts for a user
    async incrementOtpAttempts(email) {
        await db_1.pool.query(`
    UPDATE users
    SET otp_attempts = otp_attempts + 1
    WHERE email = $1
    `, [email]);
    }
    // Lock user for 5 minutes after too many failed OTP attempts
    async lockUser(email) {
        await db_1.pool.query(`
    UPDATE users
    SET locked_until = NOW() + INTERVAL '5 minutes'
    WHERE email = $1
    `, [email]);
    }
    // Save OTP code and expiration time for a user
    async saveOTP(email, otp, expires) {
        await db_1.pool.query(`
    UPDATE users
    SET otp_code = $1,
        otp_expires_at = $2,
        otp_attempts = 0
    WHERE email = $3
    `, [otp, expires, email]);
    }
    // Update user's password and clear OTP data
    async updatePassword(email, password) {
        await db_1.pool.query(`
    UPDATE users
    SET password = $1,
        otp_code = NULL,
        otp_expires_at = NULL,
        otp_attempts = 0,
        locked_until = NULL,
        updated_at = NOW()
    WHERE email = $2
    `, [password, email]);
    }
    // Mark OTP as verified for a session
    async verifySession(sessionId) {
        await db_1.pool.query(`
    UPDATE password_reset_sessions
    SET otp_verified = TRUE
    WHERE session_id = $1
    `, [sessionId]);
    }
    // Update OTP code, expiration, and resend availability for a user
    async updateOTP(email, otp, otpExpiresAt, resendAvailableAt) {
        await db_1.pool.query(`
    UPDATE users
    SET
      otp_code = $1,
      otp_expires_at = $2,
      otp_attempts = 0,
      otp_resend_available_at = $3
    WHERE email = $4
    `, [
            otp,
            otpExpiresAt,
            resendAvailableAt,
            email
        ]);
    }
}
exports.ForgotPasswordRepository = ForgotPasswordRepository;
