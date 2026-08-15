import { pool } from "../../config/db";

export class CreatePatientPointsRepository {

  async create(userId: number) {
    const result = await pool.query(
      `
      INSERT INTO patient_points
      (user_id,total_points)
      VALUES
      ($1, 0)
      RETURNING *
      `,
      [userId]
    );

    return result.rows[0];
  }

}