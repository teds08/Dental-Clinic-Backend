"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationRepository = void 0;
const db_1 = require("../../config/db");
class CreateNotificationRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(userId, title, message) {
        const result = await this.db.query(`
      INSERT INTO notifications
      (user_id, title, message)
      VALUES
      ($1,$2,$3)
      RETURNING
        id,
        title,
        message,
        is_read,
        created_at
      `, [
            userId,
            title,
            message
        ]);
        return result.rows[0];
    }
}
exports.CreateNotificationRepository = CreateNotificationRepository;
