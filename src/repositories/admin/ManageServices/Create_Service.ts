import { pool } from "../../../config/db";
import { IService } from "../../../interfaces/service.interface";

export class CreateServiceRepository {
  async create(data: IService) {

    const result = await pool.query(
      `
      INSERT INTO services
      (title, description, price, image, image_public_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        data.title,
        data.description,
        data.price,
        data.image,
        data.image_public_id
      ]
    );

    return result.rows[0];
  }
}