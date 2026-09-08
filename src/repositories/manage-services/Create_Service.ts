import { pool } from "../../config/db";
import { IService } from "../../interfaces/service.interface";

export class CreateServiceRepository {
  async create(data: IService) {
    const result = await pool.query(
      `
INSERT INTO services
(
image,
image_public_id,
title,
description,
price,
points,
duration_minutes,
category
)

VALUES
($1,$2,$3,$4,$5,$6,$7,$8)

RETURNING *
`,

      [
        data.image,
        data.image_public_id,
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
