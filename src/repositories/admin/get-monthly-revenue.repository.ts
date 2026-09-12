import { pool } from "../../config/db";
import { Database } from "../../types/database.type";

export class GetMonthlyRevenueRepository {
  constructor(private db: Database = pool) {}

  async getMonthlyRevenue(): Promise<number> {
    const result = await this.db.query(
      `
      SELECT
        COALESCE(SUM(final_amount), 0)::numeric AS monthly_revenue
      FROM appointments
      WHERE appointment_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
        AND appointment_date < DATE_TRUNC('month', CURRENT_DATE)
        AND status = 'COMPLETED'
        AND deleted_at IS NULL
      `,
    );

    return Number(result.rows[0].monthly_revenue);
  }

  async getRevenueHistory() {
    const result = await this.db.query(
      `
    SELECT
      TO_CHAR(
        DATE_TRUNC('month', appointment_date),
        'Mon'
      ) AS month,
      COALESCE(SUM(final_amount), 0)::numeric AS revenue
    FROM appointments
    WHERE status = 'COMPLETED'
      AND deleted_at IS NULL
      AND appointment_date >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months'
      AND appointment_date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    GROUP BY DATE_TRUNC('month', appointment_date)
    ORDER BY DATE_TRUNC('month', appointment_date) ASC
    `,
    );

    return result.rows.map((row) => ({
      month: row.month,
      revenue: Number(row.revenue),
    }));
  }
}
