import { pool } from "../../config/db";

export class RejectAppointmentRepository {

  async reject(id: number) {

    const result = await pool.query(
      `
      UPDATE appointments
      SET
        status = 'REJECTED',
        updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        user_id,
        service_id,
        patient_name,
        appointment_date,
        appointment_time,
        status,
        updated_at
      `,
      [id]
    );

    return result.rows[0];

  }

}