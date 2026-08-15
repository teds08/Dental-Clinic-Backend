import { pool } from "../../config/db";

export class ArchiveListRepository {

  async getArchivedServices() {

    const result = await pool.query(
      `
      SELECT *
      FROM services
      WHERE deleted_at IS NOT NULL
      ORDER BY deleted_at DESC
      `
    );

    return result.rows;
  }

}