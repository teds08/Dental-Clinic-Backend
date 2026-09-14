"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockUserRepository = void 0;
const db_1 = require("../../config/db");
class LockUserRepository {
    async lockAccount(userId) {
        await db_1.pool.query(`
    UPDATE users
    SET
      locked_until = NOW() + INTERVAL '5 minutes',
      updated_at = NOW()
    WHERE id = $1
    `, [userId]);
    }
}
exports.LockUserRepository = LockUserRepository;
