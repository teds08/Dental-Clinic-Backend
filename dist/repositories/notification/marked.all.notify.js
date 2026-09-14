"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAllNotificationsReadRepository = void 0;
const db_1 = require("../../config/db");
class MarkAllNotificationsReadRepository {
    async markAll(userId) {
        const result = await db_1.pool.query(`
      UPDATE notifications
      SET
        is_read = TRUE
      WHERE
        user_id = $1
        AND is_read = FALSE
      RETURNING id
      `, [userId]);
        return result.rowCount;
    }
}
exports.MarkAllNotificationsReadRepository = MarkAllNotificationsReadRepository;
