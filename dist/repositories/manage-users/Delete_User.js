"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardDeleteRepository = void 0;
const db_1 = require("../../config/db");
class HardDeleteRepository {
    async hardDelete(id) {
        const result = await db_1.pool.query(`
    DELETE FROM users
    WHERE id = $1
    RETURNING id, deleted_at
    `, [id]);
        return result.rows[0];
    }
}
exports.HardDeleteRepository = HardDeleteRepository;
