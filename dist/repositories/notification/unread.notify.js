"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadNotificationCountRepository = void 0;
const db_1 = require("../../config/db");
class UnreadNotificationCountRepository {
    async count(userId) {
        const result = await db_1.pool.query(`
      SELECT COUNT(*)::INT AS unread_count
      FROM notifications
      WHERE
        user_id = $1
        AND is_read = FALSE
      `, [userId]);
        return result.rows[0];
    }
}
exports.UnreadNotificationCountRepository = UnreadNotificationCountRepository;
