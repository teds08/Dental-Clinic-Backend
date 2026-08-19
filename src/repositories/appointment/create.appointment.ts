import { pool } from "../../config/db";
import { Database } from "../../types/database.type";
import { IAppointment } from "../../interfaces/appointment.interface";


export class CreateAppointmentRepository {
constructor(private db: Database = pool) {}

  async create(data: IAppointment) {
    const result = await this.db.query(
      `
      INSERT INTO appointments
      (user_id, service_id, first_name, last_name, age, contact_number, appointment_date, appointment_time, patient_coupon_id, coupon_id, original_amount, discount_amount, final_amount, points_earned)

      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *
      `,
      [

        data.user_id,
        data.service_id,
        data.first_name,
        data.last_name,
        data.age,
        data.contact_number,
        data.appointment_date,
        data.appointment_time,
        data.patient_coupon_id ?? null,
        data.coupon_id ?? null,
        data.original_amount,
        data.discount_amount,
        data.final_amount,
        data.points_earned

      ]
    );

    return result.rows[0];

  }

}