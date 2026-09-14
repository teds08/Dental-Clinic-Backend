"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAdminsRepository = void 0;
const db_1 = require("../../config/db");
class FindAdminsRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async findAll() {
        const result = await this.db.query(`
      SELECT
        id,
        first_name,
        last_name
        
      FROM users
      WHERE
        role_id = 1
        AND deleted_at IS NULL
      `);
        return result.rows;
    }
}
exports.FindAdminsRepository = FindAdminsRepository;
