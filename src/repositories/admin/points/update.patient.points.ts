import { Database } from "../../../types/database.type";
import { pool } from "../../../config/db";


export class UpdatePatientPointsRepository {
constructor(private db: Database = pool) {}

async updateBalance(userId: number,newBalance: number) {

    const result = await this.db.query(

        `
        UPDATE patient_points
        SET
          total_points = $1,
          updated_at = NOW()
        WHERE
          user_id = $2
        RETURNING *
        `,

        [newBalance,userId]

      );

    return result.rows[0];

  }

}