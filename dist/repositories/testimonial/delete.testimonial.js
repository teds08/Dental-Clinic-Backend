"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTestimonialRepository = void 0;
const db_1 = require("../../config/db");
class DeleteTestimonialRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async delete(testimonialId, userId) {
        const result = await this.db.query(`
      UPDATE testimonials
      SET
        deleted_at = NOW(),
        updated_at = NOW()
      WHERE id = $1
        AND user_id = $2
        AND deleted_at IS NULL
      RETURNING *
      `, [testimonialId, userId]);
        return result.rows[0];
    }
}
exports.DeleteTestimonialRepository = DeleteTestimonialRepository;
