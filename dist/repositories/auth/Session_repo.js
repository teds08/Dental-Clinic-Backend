"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepository = void 0;
const db_1 = require("../../config/db");
class SessionRepository {
    async createSession(sessionId, email, expiresAt) {
        await db_1.pool.query(`
    INSERT INTO password_reset_sessions (
      session_id,
      email,
      expires_at,
      otp_verified
    )
    VALUES ($1, $2, $3, FALSE)
    `, [sessionId, email, expiresAt]);
    }
    async getSession(sessionId) {
        const result = await db_1.pool.query(`
    SELECT * FROM password_reset_sessions
    WHERE session_id = $1
    `, [sessionId]);
        return result.rows[0];
    }
    async deleteSession(sessionId) {
        await db_1.pool.query(`
    DELETE FROM password_reset_sessions
    WHERE session_id = $1
    `, [sessionId]);
    }
    async deleteOldSession(email) {
        await db_1.pool.query(`
    DELETE FROM password_reset_sessions
    WHERE email = $1
    `, [email]);
    }
}
exports.SessionRepository = SessionRepository;
