"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkNotificationReadRepository = void 0;
const db_1 = require("../../config/db");
class MarkNotificationReadRepository {
    async markAsRead(notificationId, userId) {
        const result = await db_1.pool.query(`
      UPDATE notifications
      SET
        is_read = TRUE
      WHERE
        id = $1
        AND user_id = $2
      RETURNING
        id,
        title,
        message,
        is_read,
        created_at
      `, [
            notificationId,
            userId
        ]);
        return result.rows[0];
    }
}
exports.MarkNotificationReadRepository = MarkNotificationReadRepository;
