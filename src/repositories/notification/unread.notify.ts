import { pool } from "../../config/db";

export class UnreadNotificationCountRepository {

  async count(userId: number) {

    const result = await pool.query(
      `
      SELECT COUNT(*)::INT AS unread_count
      FROM notifications
      WHERE
        user_id = $1
        AND is_read = FALSE
      `,
      [userId]
    );

    return result.rows[0];

  }

}