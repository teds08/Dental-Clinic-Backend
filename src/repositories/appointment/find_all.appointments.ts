import { pool } from "../../config/db";

export class FindAllAppointmentsRepository {

  async getAll() {

    const result = await pool.query(
      `
      SELECT
        a.id,
        a.patient_name,
        a.age,
        a.contact_number,
        s.title AS service,
        s.price,
        a.appointment_date,
        a.appointment_time,
        a.status,
        u.id AS account_owner_id,
        u.username AS account_owner,
        a.created_at

      FROM appointments a
      
      INNER JOIN users u
        ON a.user_id = u.id
      INNER JOIN services s
        ON a.service_id = s.id

      WHERE a.deleted_at IS NULL

      ORDER BY
        a.appointment_date ASC,
        a.appointment_time ASC
      `
    );

    return result.rows;

  }

}