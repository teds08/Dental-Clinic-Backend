import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class FindAppointmentRepository {
  constructor(private db: Database = pool) {}

  async findById(id: number) {
    const result = await this.db.query(
      `
      SELECT

        a.*,
        s.title,
        s.duration_minutes,
        s.points,
        s.price

      FROM appointments a

      INNER JOIN services s
        ON s.id = a.service_id

      WHERE
        a.id = $1
        AND a.deleted_at IS NULL

      LIMIT 1
      `,
      [id],
    );

    return result.rows[0];
  }

  async findByIdAndUserId(appointmentId: number, userId: number) {
    const result = await this.db.query(
      `
    SELECT

      a.*,

      s.title,
      s.duration_minutes,
      s.points,
      s.price

    FROM appointments a

    INNER JOIN services s
      ON s.id = a.service_id

    WHERE
      a.id = $1
      AND a.user_id = $2
      AND a.deleted_at IS NULL

    LIMIT 1
    `,
      [appointmentId, userId],
    );

    return result.rows[0];
  }
}
