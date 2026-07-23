import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

import { IAppointment } from "../../interfaces/appointment.interface";

export class CreateAppointmentRepository {

    constructor(private db: Database = pool) {}


  async create(data: IAppointment) {

    const result = await this.db.query(
      `
      INSERT INTO appointments
      (
        user_id,
        service_id,
        patient_name,
        age,
        contact_number,
        appointment_date,
        appointment_time
      )

      VALUES
      ($1,$2,$3,$4,$5,$6,$7)

      RETURNING
        id,
        user_id,
        service_id,
        patient_name,
        age,
        contact_number,
        appointment_date,
        appointment_time,
        status,
        created_at
      `,
      [
        data.user_id,
        data.service_id,
        data.patient_name,
        data.age,
        data.contact_number,
        data.appointment_date,
        data.appointment_time
      ]
    );

    return result.rows[0];

  }

}