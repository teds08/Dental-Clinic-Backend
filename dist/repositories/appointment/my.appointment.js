"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMyAppointmentsRepository = void 0;
const db_1 = require("../../config/db");
class FindMyAppointmentsRepository {
    async getByUserId(userId) {
        const result = await db_1.pool.query(`
      SELECT

        a.id,
        s.id AS service_id,
        s.title AS service,
        a.appointment_date,
        a.appointment_time,
        a.doctor_notes,
        a.status,
        a.created_at

      FROM appointments a

      INNER JOIN services s
        ON a.service_id = s.id

      WHERE
        a.user_id = $1
        AND a.deleted_at IS NULL

      ORDER BY
        a.appointment_date DESC,
        a.appointment_time DESC
      `, [userId]);
        return result.rows;
    }
}
exports.FindMyAppointmentsRepository = FindMyAppointmentsRepository;
