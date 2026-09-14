"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllAppointmentsRepository = void 0;
const db_1 = require("../../config/db");
class FindAllAppointmentsRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async getAll(status, search, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const searchValue = search?.trim() || null;
        const result = await this.db.query(`
      SELECT
        a.id,
        a.user_id,
        a.service_id,
        a.first_name,
        a.last_name,
        a.age,
        a.contact_number,
        s.title AS service_name,
        s.deleted_at AS service_deleted_at,
        a.appointment_date,
        a.appointment_time,
        a.doctor_notes,
        a.status,
        a.patient_coupon_id,
        a.coupon_id,
        a.original_amount,
        a.discount_amount,
        a.final_amount,
        a.points_earned,
        a.created_at,
        a.updated_at
      FROM appointments a
      INNER JOIN services s
        ON s.id = a.service_id
      WHERE a.deleted_at IS NULL
        AND ($1::VARCHAR IS NULL OR a.status = $1)
        AND (
          $2::VARCHAR IS NULL
          OR a.first_name ILIKE '%' || $2 || '%'
          OR a.last_name ILIKE '%' || $2 || '%'
          OR a.contact_number ILIKE '%' || $2 || '%'
          OR s.title ILIKE '%' || $2 || '%'
        )
      ORDER BY
        a.appointment_date ASC,
        a.appointment_time ASC,
        a.id ASC
      LIMIT $3
      OFFSET $4
      `, [status ?? null, searchValue, limit, offset]);
        const countResult = await this.db.query(`
      SELECT COUNT(*)::int AS total
      FROM appointments a
      INNER JOIN services s
        ON s.id = a.service_id
      WHERE a.deleted_at IS NULL
        AND ($1::VARCHAR IS NULL OR a.status = $1)
        AND (
          $2::VARCHAR IS NULL
          OR a.first_name ILIKE '%' || $2 || '%'
          OR a.last_name ILIKE '%' || $2 || '%'
          OR a.contact_number ILIKE '%' || $2 || '%'
          OR s.title ILIKE '%' || $2 || '%'
        )
      `, [status ?? null, searchValue]);
        return {
            appointments: result.rows,
            total: countResult.rows[0].total,
        };
    }
}
exports.FindAllAppointmentsRepository = FindAllAppointmentsRepository;
