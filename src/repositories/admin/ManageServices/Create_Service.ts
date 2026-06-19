import { pool } from "../../../config/db";
import { IService } from "../../../interfaces/service.interface";

export class CreateServiceRepository {
  async create(data: IService) {
    const result = await pool.query(
      `
      INSERT INTO services (image, title, description, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [data.image, data.title, data.description, data.price]
    );

    return result.rows[0];
  }
}