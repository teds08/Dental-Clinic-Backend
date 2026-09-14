"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNotificationsRepository = void 0;
const db_1 = require("../../config/db");
class FindNotificationsRepository {
    async findByUserId(userId) {
        const result = await db_1.pool.query(`
      SELECT
        id,
        title,
        message,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      `, [userId]);
        return result.rows;
    }
}
exports.FindNotificationsRepository = FindNotificationsRepository;
