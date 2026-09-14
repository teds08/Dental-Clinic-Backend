"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerateTestimonialRepository = void 0;
const db_1 = require("../../config/db");
class ModerateTestimonialRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async approve(testimonialId) {
        const result = await this.db.query(`
      UPDATE testimonials
      SET
        status = 'APPROVED',
        updated_at = NOW()
      WHERE id = $1
        AND status = 'PENDING'
        AND deleted_at IS NULL
      RETURNING *
      `, [testimonialId]);
        return result.rows[0];
    }
    async reject(testimonialId) {
        const result = await this.db.query(`
      UPDATE testimonials
      SET
        status = 'REJECTED',
        updated_at = NOW()
      WHERE id = $1
        AND status = 'PENDING'
        AND deleted_at IS NULL
      RETURNING *
      `, [testimonialId]);
        return result.rows[0];
    }
}
exports.ModerateTestimonialRepository = ModerateTestimonialRepository;
