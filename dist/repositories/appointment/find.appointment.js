"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAppointmentRepository = void 0;
const db_1 = require("../../config/db");
class FindAppointmentRepository {
    constructor(db = db_1.pool) {
        this.db = db;
    }
    async findById(id) {
        const result = await this.db.query(`
      SELECT

        a.*,
        s.title,
        s.duration_minutes,
        s.points,
        s.price

      FROM appointments a

      INNER JOIN services s
        ON s.id = a.service_id

      WHERE
        a.id = $1
        AND a.deleted_at IS NULL

      LIMIT 1
      `, [id]);
        return result.rows[0];
    }
    async findByIdAndUserId(appointmentId, userId) {
        const result = await this.db.query(`
    SELECT

      a.*,

      s.title,
      s.duration_minutes,
      s.points,
      s.price

    FROM appointments a

    INNER JOIN services s
      ON s.id = a.service_id

    WHERE
      a.id = $1
      AND a.user_id = $2
      AND a.deleted_at IS NULL

    LIMIT 1
    `, [appointmentId, userId]);
        return result.rows[0];
    }
}
exports.FindAppointmentRepository = FindAppointmentRepository;
