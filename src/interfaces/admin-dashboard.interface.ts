export interface IUpcomingAppointment {
  id: number;
  first_name: string;
  last_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

export interface IAdminDashboard {
  total_patients: number;
  appointments_last_month: number;
  upcoming_appointments: IUpcomingAppointment[];
  monthly_revenue: number;
}
