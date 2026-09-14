"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentCountRepository = void 0;
const db_1 = require("../../config/db");
class GetAppointmentCountRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async getAppointmentsLastMonth() {
        const result = await this.db.query(`
      SELECT COUNT(*)::int AS appointments_last_month
      FROM appointments
      WHERE appointment_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
        AND appointment_date < DATE_TRUNC('month', CURRENT_DATE)
        AND deleted_at IS NULL
      `);
        return result.rows[0].appointments_last_month;
    }
}
exports.GetAppointmentCountRepository = GetAppointmentCountRepository;
