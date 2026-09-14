"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPatientCountRepository = void 0;
const db_1 = require("../../config/db");
class GetPatientCountRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async getTotalPatients() {
        const result = await this.db.query(`
      SELECT COUNT(*)::int AS total_patients
      FROM users
      WHERE role_id = 2
        AND deleted_at IS NULL
        AND created_at < DATE_TRUNC('month', CURRENT_DATE)
      `);
        return result.rows[0].total_patients;
    }
}
exports.GetPatientCountRepository = GetPatientCountRepository;
