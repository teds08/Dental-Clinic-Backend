"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentStatusRepository = void 0;
const db_1 = require("../../config/db");
class UpdateAppointmentStatusRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async updateStatus(appointmentId, currentStatus, newStatus) {
        const result = await this.db.query(`
      UPDATE appointments
      SET
        status = $1,
        updated_at = NOW()
      WHERE
        id = $2
        AND status = $3
        AND deleted_at IS NULL
      RETURNING *
      `, [
            newStatus,
            appointmentId,
            currentStatus
        ]);
        return result.rows[0];
    }
    async findCouponConflict(appointmentId, patientCouponId) {
        const result = await this.db.query(`
            SELECT

                id,
                user_id,
                patient_coupon_id,
                status,
                appointment_date,
                appointment_time

            FROM appointments

            WHERE

                patient_coupon_id = $1

                AND id <> $2

                AND status IN ('PENDING', 'APPROVED')

                AND deleted_at IS NULL

            ORDER BY
                created_at ASC

            LIMIT 1
            `, [
            patientCouponId,
            appointmentId
        ]);
        return result.rows[0];
    }
}
exports.UpdateAppointmentStatusRepository = UpdateAppointmentStatusRepository;
