"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllServiceRepository = void 0;
const db_1 = require("../../config/db");
class GetAllServiceRepository {
    async getAll() {
        const result = await db_1.pool.query(`
      SELECT *
      FROM services
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      `);
        return result.rows;
    }
}
exports.GetAllServiceRepository = GetAllServiceRepository;
