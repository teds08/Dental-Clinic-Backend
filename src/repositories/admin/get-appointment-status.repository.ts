import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class GetAppointmentStatusRepository {
  constructor(private db: Database = pool) {}

  async getAppointmentStatus() {
    const result = await this.db.query(
      `
      SELECT
        status,
        COUNT(*)::int AS count
      FROM appointments
      WHERE deleted_at IS NULL
      GROUP BY status
      ORDER BY status ASC
      `,
    );

    return result.rows;
  }
}
