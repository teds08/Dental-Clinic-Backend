import { pool } from "../../config/db";

export class MarkAllNotificationsReadRepository {

  async markAll(userId: number) {

    const result = await pool.query(
      `
      UPDATE notifications
      SET
        is_read = TRUE
      WHERE
        user_id = $1
        AND is_read = FALSE
      RETURNING id
      `,
      [userId]
    );

    return result.rowCount;

  }

}