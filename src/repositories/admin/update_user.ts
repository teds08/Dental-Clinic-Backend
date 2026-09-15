import { Pool } from "pg";
import { pool } from "../../config/db";
import { IAdminUpdateUser } from "../../interfaces/admin-dashboard.interface";
import { Database } from "../../types/database.type";

export class UpdateUserRepository {
  constructor(private db: Database = pool) {}

  async update(userId: number, data: IAdminUpdateUser) {
    const client = this.db instanceof Pool ? await this.db.connect() : this.db;

    const shouldRelease = this.db instanceof Pool;

    try {
      await client.query("BEGIN");

      const fields: string[] = [];
      const values: unknown[] = [];
      let parameterIndex = 1;

      const allowedFields: (keyof IAdminUpdateUser)[] = [
        "first_name",
        "last_name",
        "email",
        "password",
        "contact_number",
        "role_id",
        "date_of_birth",
        "address",
        "gender",
        "emergency_contact",
        "emergency_contact_number",
      ];

      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          fields.push(`${field} = $${parameterIndex}`);
          values.push(data[field]);
          parameterIndex++;
        }
      }

      if (fields.length === 0) {
        throw new Error("No fields were provided for update.");
      }

      fields.push("updated_at = CURRENT_TIMESTAMP");

      values.push(userId);

      const result = await client.query(
        `
        UPDATE users
        SET
          ${fields.join(", ")}
        WHERE id = $${parameterIndex}
          AND deleted_at IS NULL
        RETURNING
          id,
          first_name,
          last_name,
          email,
          contact_number,
          role_id,
          date_of_birth,
          address,
          gender,
          emergency_contact,
          emergency_contact_number,
          created_at,
          updated_at
        `,
        values,
      );

      if (result.rowCount === 0) {
        throw new Error("User not found.");
      }

      await client.query("COMMIT");

      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      if (shouldRelease) {
        client.release();
      }
    }
  }
}
