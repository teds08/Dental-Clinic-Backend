"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveListRepository = void 0;
const db_1 = require("../../config/db");
class ArchiveListRepository {
    async getArchivedServices() {
        const result = await db_1.pool.query(`
      SELECT *
      FROM services
      WHERE deleted_at IS NOT NULL
      ORDER BY deleted_at DESC
      `);
        return result.rows;
    }
}
exports.ArchiveListRepository = ArchiveListRepository;
