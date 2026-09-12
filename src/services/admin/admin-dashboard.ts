import {
  GetPatientCountRepository,
  GetAppointmentCountRepository,
  GetUpcomingAppointmentsRepository,
  GetMonthlyRevenueRepository,
  GetAppointmentStatusRepository,
} from "../../repositories/admin/index";

import { IAdminDashboard } from "../../interfaces/admin-dashboard.interface";

export class AdminDashboardService {
  private getPatientCountRepository: GetPatientCountRepository;
  private getAppointmentCountRepository: GetAppointmentCountRepository;
  private getUpcomingAppointmentsRepository: GetUpcomingAppointmentsRepository;
  private getMonthlyRevenueRepository: GetMonthlyRevenueRepository;
  private getAppointmentStatusRepository: GetAppointmentStatusRepository;

  constructor() {
    this.getPatientCountRepository = new GetPatientCountRepository();
    this.getAppointmentCountRepository = new GetAppointmentCountRepository();
    this.getUpcomingAppointmentsRepository =
      new GetUpcomingAppointmentsRepository();
    this.getMonthlyRevenueRepository = new GetMonthlyRevenueRepository();
    this.getAppointmentStatusRepository = new GetAppointmentStatusRepository();
  }

  async getDashboard(): Promise<IAdminDashboard> {
    const [
      totalPatients,
      appointmentsLastMonth,
      upcomingAppointments,
      monthlyRevenue,
      revenueHistory,
      appointmentStatus,
    ] = await Promise.all([
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
