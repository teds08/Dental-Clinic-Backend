"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNotificationRepository = void 0;
const db_1 = require("../../config/db");
class DeleteNotificationRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async deleteNotification(notificationId, userId) {
        const result = await this.db.query(`
      DELETE FROM notifications
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `, [notificationId, userId]);
        return result.rows[0] ?? null;
    }
}
exports.DeleteNotificationRepository = DeleteNotificationRepository;
