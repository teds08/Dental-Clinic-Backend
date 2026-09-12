import {
  GetPatientCountRepository,
  GetAppointmentCountRepository,
  GetUpcomingAppointmentsRepository,
  GetMonthlyRevenueRepository,
} from "../../repositories/admin/index";

import { IAdminDashboard } from "../../interfaces/admin-dashboard.interface";

export class AdminDashboardService {
  private getPatientCountRepository: GetPatientCountRepository;
  private getAppointmentCountRepository: GetAppointmentCountRepository;
  private getUpcomingAppointmentsRepository: GetUpcomingAppointmentsRepository;
  private getMonthlyRevenueRepository: GetMonthlyRevenueRepository;

  constructor() {
    this.getPatientCountRepository = new GetPatientCountRepository();
    this.getAppointmentCountRepository = new GetAppointmentCountRepository();
    this.getUpcomingAppointmentsRepository =
      new GetUpcomingAppointmentsRepository();
    this.getMonthlyRevenueRepository = new GetMonthlyRevenueRepository();
  }

  async getDashboard(): Promise<IAdminDashboard> {
    const [
      totalPatients,
      appointmentsLastMonth,
      upcomingAppointments,
      monthlyRevenue,
    ] = await Promise.all([
      this.getPatientCountRepository.getTotalPatients(),
      this.getAppointmentCountRepository.getAppointmentsLastMonth(),
      this.getUpcomingAppointmentsRepository.getUpcomingAppointments(),
      this.getMonthlyRevenueRepository.getMonthlyRevenue(),
    ]);

    return {
      total_patients: totalPatients,
      appointments_last_month: appointmentsLastMonth,
      upcoming_appointments: upcomingAppointments,
      monthly_revenue: monthlyRevenue,
    };
  }
}
