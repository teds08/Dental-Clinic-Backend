import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class GetUpcomingAppointmentsRepository {
  constructor(private db: Database = pool) {}

  async getUpcomingAppointments() {
    const result = await this.db.query(
      `
      SELECT
        a.id,
        a.first_name,
        a.last_name,
        s.title AS service_name,
        a.appointment_date,
        a.appointment_time,
        a.status
      FROM appointments a
      INNER JOIN services s
        ON s.id = a.service_id
      WHERE a.appointment_date >= CURRENT_DATE
        AND a.appointment_date <= CURRENT_DATE + INTERVAL '1 day'
        AND a.status IN ('PENDING', 'APPROVED')
        AND a.deleted_at IS NULL
      ORDER BY
        a.appointment_date ASC,
        a.appointment_time ASC
      `,
    );

    return result.rows;
  }
}
