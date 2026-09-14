"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdRepository = void 0;
const db_1 = require("../../config/db");
class FindByIdRepository {
    async findById(id) {
        const result = await db_1.pool.query(`
      SELECT *
      FROM users
      WHERE id = $1
      AND deleted_at IS NULL
      `, [id]);
        return result.rows[0];
    }
}
exports.FindByIdRepository = FindByIdRepository;
