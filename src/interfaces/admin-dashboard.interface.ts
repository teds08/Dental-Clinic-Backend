export interface IUpcomingAppointment {
  id: number;
  first_name: string;
  last_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

export interface IRevenueHistory {
  month: string;
  revenue: number;
}

export interface IAdminDashboard {
  total_patients: number;
  appointments_last_month: number;
  upcoming_appointments: IUpcomingAppointment[];
  monthly_revenue: number;
  revenue_history: IRevenueHistory[];
  appointment_status: IAppointmentStatus[];
}

export interface IAppointmentStatus {
  status: string;
  count: number;
}

export interface IAdminUpdateUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  contact_number?: string;
  role_id?: number;
  date_of_birth?: string;
  address?: string;
  gender?: string;
  emergency_contact?: string;
  emergency_contact_number?: string;
}
