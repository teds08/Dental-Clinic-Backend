import { pool } from "../../config/db";
import { IUser } from "../../interfaces/user.interface";

export class CreateUserRepository {
  async create(data: IUser) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const userResult = await client.query(
        `
        INSERT INTO users
        (first_name, last_name, email, password, contact_number, role_id, date_of_birth, address, gender, emergency_contact, emergency_contact_number)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)

        RETURNING
          id,
          role_id,
          created_at
        `,

        [
          data.first_name,
          data.last_name,
          data.email,
          data.password,
          data.contact_number,
          data.role_id,
          data.date_of_birth,
          data.address,
          data.gender,
          data.emergency_contact ?? null,
          data.emergency_contact_number ?? null,
        ],
      );

      const user = userResult.rows[0];

      await client.query(
        `
        INSERT INTO patient_points
        (user_id, total_points)

        VALUES
        ($1,0)
        `,
        [user.id],
      );

      await client.query("COMMIT");

      return user;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
