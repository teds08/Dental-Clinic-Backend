import { pool } from "../../../config/db";
import { IUser } from "../../../interfaces/user.interface";

export class CreateUserRepository {
    async create(data: IUser) {
    const result = await pool.query(
      `
      INSERT INTO users (username,email,password,contact_number,role_id)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING 
      id,username,email,role_id,created_at
      `,
      [
        data.username,
        data.email,
        data.password,
        data.contact_number,
        data.role_id
      ]
    );

    return result.rows[0];
  }


}