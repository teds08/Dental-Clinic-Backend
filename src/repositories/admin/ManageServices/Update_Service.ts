import { pool } from "../../../config/db";

export class UpdateServiceRepository {

  async update(id: number, data: any) {
    const result = await pool.query(
      `
      UPDATE services
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        image = COALESCE($4, image),
        image_public_id = COALESCE($5, image_public_id),
        points = COALESCE($6, points),
        duration_minutes = COALESCE($7, duration_minutes),
        updated_at = NOW()
      WHERE id = $8
      RETURNING *
      `,
      [
        data.title,
        data.description,
        data.price,
        data.image,
        data.image_public_id,
        data.points,
        data.duration_minutes,
        id
      ]
      
    );

    return result.rows[0];
  }
}