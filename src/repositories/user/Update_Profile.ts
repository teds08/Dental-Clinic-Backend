import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class UpdateUserRepository {
constructor(private db: Database = pool) {}

async update(
    id: number,
    data: {
      first_name?: string;
      last_name?: string;
      contact_number?: string;
      date_of_birth?: string | null;
      address?: string | null;
      gender?: string | null;
      emergency_contact?: string | null;
      emergency_contact_number?: string | null;
    }
  ) {

    const result = await this.db.query(
      `
      UPDATE users
      SET

        first_name = COALESCE($1, first_name),

        last_name = COALESCE($2, last_name),

        contact_number = COALESCE($3, contact_number),

        date_of_birth = COALESCE($4, date_of_birth),

        address = COALESCE($5, address),

        gender = COALESCE($6, gender),

        emergency_contact = COALESCE($7, emergency_contact),

        emergency_contact_number = COALESCE($8, emergency_contact_number),

        updated_at = NOW()

      WHERE
        id = $9

        AND deleted_at IS NULL

      RETURNING
        id,
        first_name,
        last_name,
        email,
        contact_number,
        date_of_birth,
        address,
        gender,
        emergency_contact,
        emergency_contact_number,
        role_id,
        created_at,
        updated_at
      `,
      [
        data.first_name,
        data.last_name,
        data.contact_number,
        data.date_of_birth,
        data.address,
        data.gender,
        data.emergency_contact,
        data.emergency_contact_number,
        id
      ]
    );

    return result.rows[0];

  }

}