"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPatientPointsRepository = void 0;
const db_1 = require("../../config/db");
class GetPatientPointsRepository {
    async findByUserId(userId) {
        const result = await db_1.pool.query(`
      SELECT
        total_points,
        updated_at
      FROM patient_points
      WHERE user_id = $1
      `, [userId]);
        return result.rows[0];
    }
}
exports.GetPatientPointsRepository = GetPatientPointsRepository;
