import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class GetPatientCountRepository {
  constructor(private db: Database = pool) {}

  async getTotalPatients(): Promise<number> {
    const result = await this.db.query(
      `
      SELECT COUNT(*)::int AS total_patients
      FROM users
      WHERE role_id = 2
        AND deleted_at IS NULL
        AND created_at < DATE_TRUNC('month', CURRENT_DATE)
      `,
    );

    return result.rows[0].total_patients;
  }
}
