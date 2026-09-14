"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAppointmentRepository = void 0;
const db_1 = require("../../config/db");
class CancelAppointmentRepository {
    async cancel(id, userId) {
        const result = await db_1.pool.query(`
      UPDATE appointments
      SET
        status = 'CANCELLED',
        updated_at = NOW()
      WHERE
        id = $1
        AND user_id = $2
        AND deleted_at IS NULL

      RETURNING
        id,
        service_id,
        first_name,
        last_name,
        appointment_date,
        appointment_time,
        status,
        updated_at
      `, [
            id,
            userId
        ]);
        return result.rows[0];
    }
}
exports.CancelAppointmentRepository = CancelAppointmentRepository;
