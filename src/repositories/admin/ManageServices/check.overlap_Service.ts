import { pool } from "../../../config/db";

export class CheckAppointmentOverlapRepository {

  async hasConflict(
    appointmentDate: string,
    startTime: string,
    endTime: string
  ) {

    const result = await pool.query(
      `
      SELECT 1
      FROM appointments a
      JOIN services s
        ON a.service_id = s.id

      WHERE
        a.appointment_date = $1
        AND a.deleted_at IS NULL
        AND a.status IN ('PENDING', 'APPROVED')

        AND a.appointment_time < $3

        AND (
          a.appointment_time +
          (s.duration_minutes * INTERVAL '1 minute')
        ) > $2

      LIMIT 1
      `,
      [
        appointmentDate,
        startTime,
        endTime
      ]
    );

    return (result.rowCount ?? 0)> 0;

  }

}