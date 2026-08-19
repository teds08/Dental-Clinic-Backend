import { pool } from "../../config/db";

export class CancelAppointmentRepository {

  async cancel(id: number, userId: number) {

    const result = await pool.query(
      `
      UPDATE appointments
      SET
        status = 'CANCELLED',
        updated_at = NOW()
      WHERE
        id = $1
        AND user_id = $2
        AND deleted_at IS NULL

      RETURNING
        id,
        service_id,
        first_name,
        last_name,
        appointment_date,
        appointment_time,
        status,
        updated_at
      `,
      [
        id,
        userId
      ]
    );

    return result.rows[0];

  }

}