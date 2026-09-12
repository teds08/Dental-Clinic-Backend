import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class GetAppointmentCountRepository {
  constructor(private db: Database = pool) {}

  async getAppointmentsLastMonth(): Promise<number> {
    const result = await this.db.query(
      `
      SELECT COUNT(*)::int AS appointments_last_month
      FROM appointments
      WHERE appointment_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
        AND appointment_date < DATE_TRUNC('month', CURRENT_DATE)
        AND deleted_at IS NULL
      `,
    );

    return result.rows[0].appointments_last_month;
  }
}
