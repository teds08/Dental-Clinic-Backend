import { pool } from "../../config/db";
import { Database } from "../../types/database.type";


export class FindPatientPointsRepository {
constructor(private db: Database = pool) {}

 

  async findByUserId(userId: number) {
    const result = await this.db.query(

        `
        SELECT *
        FROM patient_points
        WHERE
          user_id = $1
        `,

        [userId]

      );

    return result.rows[0];

  }

}