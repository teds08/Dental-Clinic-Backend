import { pool } from "../../config/db";

export class FindAppointmentDetailsRepository {

  async findById(appointmentId: number, userId: number) {

    const result = await pool.query(
      `
      SELECT

        a.id,
        a.user_id,
        a.first_name,
        a.last_name,
        a.age,
        a.contact_number,
        s.id AS service_id,
        s.title AS service,
        s.description,
        s.price,
        s.points,
        s.duration_minutes,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.created_at,
        a.updated_at

      FROM appointments a

      INNER JOIN services s
        ON a.service_id = s.id

      WHERE
        a.id = $1
        AND a.user_id = $2
        AND a.deleted_at IS NULL

      LIMIT 1
      `,
      [
        appointmentId,
        userId
      ]
    );

    return result.rows[0];

  }

}