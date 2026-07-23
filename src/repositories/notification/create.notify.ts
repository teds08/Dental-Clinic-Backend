import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class CreateNotificationRepository {
    constructor(private db: Database = pool) {}

  async create(userId: number, title: string, message: string) {

    const result = await this.db.query(
      `
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
      `,
      [
        userId,
        title,
        message
      ]
    );

    return result.rows[0];

  }

}