import { pool } from "../../config/db";
import { Database } from "../../types/database.type";


export class FindAdminsRepository {
    constructor(private db: Database = pool) {}

  async findAll() {

    const result = await this.db.query(
      `
      SELECT
        id,
        username
      FROM users
      WHERE
        role_id = 1
        AND deleted_at IS NULL
      `
    );

    return result.rows;

  }

}