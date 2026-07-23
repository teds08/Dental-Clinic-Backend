import { Database } from "../../types/database.type";
import { pool } from "../../config/db";

export class UpdateAppointmentStatusRepository {
    constructor(private db: Database = pool) {}

  async updateStatus(
    appointmentId: number,
    currentStatus:
      | "PENDING"
      | "APPROVED"
      | "REJECTED"
      | "COMPLETED"
      | "CANCELLED",
    newStatus:
      | "PENDING"
      | "APPROVED"
      | "REJECTED"
      | "COMPLETED"
      | "CANCELLED"
  ) {

    const result = await this.db.query(
      `
      UPDATE appointments
      SET
        status = $1,
        updated_at = NOW()
      WHERE
        id = $2
        AND status = $3
        AND deleted_at IS NULL
      RETURNING *
      `,
      [
        newStatus,
        appointmentId,
        currentStatus
      ]
    );

    return result.rows[0];

  }

}