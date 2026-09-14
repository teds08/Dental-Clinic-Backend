"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestimonialRepository = void 0;
const db_1 = require("../../config/db");
class CreateTestimonialRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async create(userId, data) {
        const result = await this.db.query(`
      INSERT INTO testimonials
      (
        user_id,
        rating,
        testimonial
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *
      `, [userId, data.rating, data.testimonial]);
        return result.rows[0];
    }
}
exports.CreateTestimonialRepository = CreateTestimonialRepository;
