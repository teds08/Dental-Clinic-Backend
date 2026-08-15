import { pool } from "../../config/db";

export class GetAllServiceRepository {

  async getAll() {

    const result = await pool.query(
      `
      SELECT *
      FROM services
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      `
    );

    return result.rows;
  }

}