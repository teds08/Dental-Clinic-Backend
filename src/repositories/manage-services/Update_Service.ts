import { pool } from "../../config/db";

export class UpdateServiceRepository {
  async update(id: number, data: any) {
    // Filter out undefined/null values
    const updates = Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key]) => key);

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    // Build dynamic SET clause
    const setClauses = updates
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const values = updates.map((field) => data[field]);
    const paramIndex = values.length + 1;

    const query = `
      UPDATE services
      SET
        ${setClauses},
        updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING ${updates.join(", ")}, id, updated_at
    `;

    const result = await pool.query(query, [...values, id]);

    return result.rows[0];
  }
}
