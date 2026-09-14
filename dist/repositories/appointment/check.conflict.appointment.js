"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAppointmentOverlapRepository = void 0;
const db_1 = require("./../../config/db");
class CheckAppointmentOverlapRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async hasConflict(appointmentDate, startTime, endTime) {
        const result = await this.db.query(`
      SELECT 1
      FROM appointments a
      JOIN services s
        ON a.service_id = s.id

      WHERE
        a.appointment_date = $1
        AND a.deleted_at IS NULL
        AND a.status IN ('PENDING', 'APPROVED')

        AND a.appointment_time < $3

        AND (
          a.appointment_time +
          (s.duration_minutes * INTERVAL '1 minute')
        ) > $2

      LIMIT 1
      `, [
            appointmentDate,
            startTime,
            endTime
        ]);
        return (result.rowCount ?? 0) > 0;
    }
}
exports.CheckAppointmentOverlapRepository = CheckAppointmentOverlapRepository;
