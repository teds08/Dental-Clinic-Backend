import { pool } from "../../config/db";


export class FindByIdRepository {
   
      async findById(id: number) {
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      AND deleted_at IS NULL
      `,
      [id]
    );

    return result.rows[0];
  }


}