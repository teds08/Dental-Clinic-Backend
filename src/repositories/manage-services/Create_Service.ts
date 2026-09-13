import { pool } from "../../config/db";
import { IService } from "../../interfaces/service.interface";
import { Database } from "../../types/database.type";

export class CreateServiceRepository {
  constructor(private db: Database = pool) {}

  async create(data: IService) {
    const result = await this.db.query(
      `
      INSERT INTO services
      (
        image,
        image_public_id,
        icon,
        title,
        description,
        price,
        points,
        duration_minutes,
        category
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
        data.image,
        data.image_public_id,
        data.icon,
        data.title,
        data.description,
        data.price,
        data.points,
        data.duration_minutes,
        data.category,
      ],
    );

    return result.rows[0];
  }
}
