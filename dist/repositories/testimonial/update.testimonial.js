"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestimonialRepository = void 0;
const db_1 = require("../../config/db");
class UpdateTestimonialRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async update(testimonialId, userId, data) {
        const result = await this.db.query(`
      UPDATE testimonials
      SET
        rating = COALESCE($1, rating),
        testimonial = COALESCE($2, testimonial),
        status = 'PENDING',
        updated_at = NOW()
      WHERE id = $3
        AND user_id = $4
        AND deleted_at IS NULL
      RETURNING *
      `, [data.rating, data.testimonial, testimonialId, userId]);
        return result.rows[0];
    }
}
exports.UpdateTestimonialRepository = UpdateTestimonialRepository;
