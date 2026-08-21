import { pool } from "../../config/db";

export class FindMyAppointmentsRepository {
  async getByUserId(userId: number) {
    const result = await pool.query(
      `
      SELECT

        a.id,
        s.id AS service_id,
        s.title AS service,
        a.appointment_date,
        a.appointment_time,
        a.doctor_notes,
        a.status,
        a.created_at

      FROM appointments a

      INNER JOIN services s
        ON a.service_id = s.id

      WHERE
        a.user_id = $1
        AND a.deleted_at IS NULL

      ORDER BY
        a.appointment_date DESC,
        a.appointment_time DESC
      `,
      [userId],
    );

    return result.rows;
  }
}
