import { pool } from "../../config/db";

export class MarkNotificationReadRepository {

  async markAsRead( notificationId: number, userId: number) {

    const result = await pool.query(
      `
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
      `,
      [
        notificationId,
        userId
      ]
    );

    return result.rows[0];

  }

}