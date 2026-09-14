"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceRepository = void 0;
const db_1 = require("../../config/db");
class CreateServiceRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(data) {
        const result = await this.db.query(`
      INSERT INTO services
      (
        image,
        image_public_id,
        icon,
        title,
        description,
        price,
        points,
        duration_minutes,
        category
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `, [
            data.image,
            data.image_public_id,
            data.icon,
            data.title,
            data.description,
            data.price,
            data.points,
            data.duration_minutes,
            data.category,
        ]);
        return result.rows[0];
    }
}
exports.CreateServiceRepository = CreateServiceRepository;
