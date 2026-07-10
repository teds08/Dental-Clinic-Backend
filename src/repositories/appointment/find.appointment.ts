import { pool } from "../../config/db";

export class FindAppointmentRepository {

  async findById(id: number) {

    const result = await pool.query(
      `
      SELECT
        id,
        status,
        user_id,
        service_id
      FROM appointments
      WHERE id = $1
      AND deleted_at IS NULL
      `,
      [id]
    );

    return result.rows[0];

  }

}