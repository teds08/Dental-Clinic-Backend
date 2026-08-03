export interface IAppointment {

  id?: number;
  user_id: number;
  service_id: number;
  patient_name: string;
  age: number;
  contact_number: string;
  appointment_date: string;
  appointment_time: string;

  status?:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "COMPLETED"
    | "CANCELLED";

  patient_coupon_id?: number | null;
  original_amount: number;
  discount_amount: number;
  final_amount: number;
  points_earned: number;

}

export interface ICreateAppointment {

  service_id: number;
  patient_name: string;
  age: number;
  contact_number: string;
  appointment_date: string;
  appointment_time: string;
  patient_coupon_id?: number | null;

}