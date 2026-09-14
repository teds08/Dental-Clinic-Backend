"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientPointsRepository = void 0;
const db_1 = require("../../config/db");
class UpdatePatientPointsRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async updateBalance(userId, newBalance) {
        const result = await this.db.query(`
        UPDATE patient_points
        SET
          total_points = $1,
          updated_at = NOW()
        WHERE
          user_id = $2
        RETURNING *
        `, [newBalance, userId]);
        return result.rows[0];
    }
}
exports.UpdatePatientPointsRepository = UpdatePatientPointsRepository;
