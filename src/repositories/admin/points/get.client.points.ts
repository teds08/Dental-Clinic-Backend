import { pool } from "../../../config/db";

export class GetPatientPointsRepository {

  async findByUserId(userId: number) {
    const result = await pool.query(
      `
      SELECT
        total_points,
        updated_at
      FROM patient_points
      WHERE user_id = $1
      `,
      [userId]
    );

    return result.rows[0];

  }

}