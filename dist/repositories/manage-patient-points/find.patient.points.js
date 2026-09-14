"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPatientPointsRepository = void 0;
const db_1 = require("../../config/db");
class FindPatientPointsRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async findByUserId(userId) {
        const result = await this.db.query(`
        SELECT *
        FROM patient_points
        WHERE
          user_id = $1
        `, [userId]);
        return result.rows[0];
    }
}
exports.FindPatientPointsRepository = FindPatientPointsRepository;
