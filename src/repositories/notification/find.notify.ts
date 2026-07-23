import { pool } from "../../config/db";

export class FindNotificationsRepository {

  async findByUserId(userId: number) {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        message,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return result.rows;

  }

}