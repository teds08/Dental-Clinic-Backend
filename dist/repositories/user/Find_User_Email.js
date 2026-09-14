"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindEmailUserRepository = void 0;
const db_1 = require("../../config/db");
class FindEmailUserRepository {
    async findByEmail(email) {
        const result = await db_1.pool.query(`SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`, [email]);
        return result.rows[0];
    }
}
exports.FindEmailUserRepository = FindEmailUserRepository;
