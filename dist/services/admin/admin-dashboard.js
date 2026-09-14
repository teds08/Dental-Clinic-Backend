"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardService = void 0;
const index_1 = require("../../repositories/admin/index");
class AdminDashboardService {
    constructor() {
        this.getPatientCountRepository = new index_1.GetPatientCountRepository();
        this.getAppointmentCountRepository = new index_1.GetAppointmentCountRepository();
        this.getUpcomingAppointmentsRepository =
            new index_1.GetUpcomingAppointmentsRepository();
        this.getMonthlyRevenueRepository = new index_1.GetMonthlyRevenueRepository();
        this.getAppointmentStatusRepository = new index_1.GetAppointmentStatusRepository();
    }
    async getDashboard() {
        const [totalPatients, appointmentsLastMonth, upcomingAppointments, monthlyRevenue, revenueHistory, appointmentStatus,] = await Promise.all([
            this.getPatientCountRepository.getTotalPatients(),
            this.getAppointmentCountRepository.getAppointmentsLastMonth(),
            this.getUpcomingAppointmentsRepository.getUpcomingAppointments(),
            this.getMonthlyRevenueRepository.getMonthlyRevenue(),
            this.getMonthlyRevenueRepository.getRevenueHistory(),
            this.getAppointmentStatusRepository.getAppointmentStatus(),
        ]);
        return {
            total_patients: totalPatients,
            appointments_last_month: appointmentsLastMonth,
            upcoming_appointments: upcomingAppointments,
            monthly_revenue: monthlyRevenue,
            revenue_history: revenueHistory,
            appointment_status: appointmentStatus,
        };
    }
}
exports.AdminDashboardService = AdminDashboardService;
