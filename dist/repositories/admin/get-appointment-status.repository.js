"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentStatusRepository = void 0;
const db_1 = require("../../config/db");
class GetAppointmentStatusRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async getAppointmentStatus() {
        const result = await this.db.query(`
      SELECT
        status,
        COUNT(*)::int AS count
      FROM appointments
      WHERE deleted_at IS NULL
      GROUP BY status
      ORDER BY status ASC
      `);
        return result.rows;
    }
}
exports.GetAppointmentStatusRepository = GetAppointmentStatusRepository;
