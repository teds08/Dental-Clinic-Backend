import { pool } from "../../config/db";
import { Database } from "../../types/database.type";
import { IUpdateService } from "../../interfaces/service.interface";

export class UpdateServiceRepository {
  constructor(private db: Database = pool) {}

  async findById(id: number) {
    const result = await this.db.query(
      `
      SELECT *
      FROM services
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async update(id: number, data: IUpdateService) {
    const result = await this.db.query(
      `
      UPDATE services
      SET
        image = COALESCE($1, image),
        image_public_id = COALESCE($2, image_public_id),
        icon = COALESCE($3, icon),
        title = COALESCE($4, title),
        description = COALESCE($5, description),
        price = COALESCE($6, price),
        points = COALESCE($7, points),
        duration_minutes = COALESCE($8, duration_minutes),
        category = COALESCE($9, category),
        updated_at = NOW()
      WHERE id = $10
        AND deleted_at IS NULL
      RETURNING *
      `,
      [
        data.image ?? null,
        data.image_public_id ?? null,
        data.icon ?? null,
        data.title ?? null,
        data.description ?? null,
        data.price ?? null,
        data.points ?? null,
        data.duration_minutes ?? null,
        data.category ?? null,
        id,
      ],
    );

    return result.rows[0] ?? null;
  }
}
