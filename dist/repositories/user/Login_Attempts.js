"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedAttemptsUserRepository = void 0;
const db_1 = require("../../config/db");
class FailedAttemptsUserRepository {
    async incrementFailedAttempts(userId) {
        await db_1.pool.query(`
    UPDATE users
    SET
      failed_login_attempts = failed_login_attempts + 1,
      updated_at = NOW()
    WHERE id = $1
    `, [userId]);
    }
}
exports.FailedAttemptsUserRepository = FailedAttemptsUserRepository;
