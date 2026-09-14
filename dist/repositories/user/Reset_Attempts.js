"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetAttemptsUserRepository = void 0;
const db_1 = require("../../config/db");
class ResetAttemptsUserRepository {
    async resetLoginAttempts(userId) {
        await db_1.pool.query(`
    UPDATE users
    SET
      failed_login_attempts = 0,
      locked_until = NULL,
      updated_at = NOW()
    WHERE id = $1
    `, [userId]);
    }
}
exports.ResetAttemptsUserRepository = ResetAttemptsUserRepository;
