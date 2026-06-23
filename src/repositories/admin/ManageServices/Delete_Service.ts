import { pool } from "../../../config/db";

export class DeletePermanentRepository {

  async delete(id: number) {

    const result = await pool.query(
      `
      DELETE FROM services
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );


    return result.rows[0];
  }

}