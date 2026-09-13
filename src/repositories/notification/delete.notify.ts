import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class DeleteNotificationRepository {
  constructor(private db: Database = pool) {}

  async deleteNotification(notificationId: number, userId: number) {
    const result = await this.db.query(
      `
      DELETE FROM notifications
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [notificationId, userId],
    );

    return result.rows[0] ?? null;
  }
}
