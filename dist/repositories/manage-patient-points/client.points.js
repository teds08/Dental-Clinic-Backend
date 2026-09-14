"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePatientPointsRepository = void 0;
const db_1 = require("../../config/db");
class CreatePatientPointsRepository {
    async create(userId) {
        const result = await db_1.pool.query(`
      INSERT INTO patient_points
      (user_id,total_points)
      VALUES
      ($1, 0)
      RETURNING *
      `, [userId]);
        return result.rows[0];
    }
}
exports.CreatePatientPointsRepository = CreatePatientPointsRepository;
