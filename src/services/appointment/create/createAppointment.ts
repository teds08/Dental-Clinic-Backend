import { CreateAppointmentRepository } from "../../../repositories/appointment/index";
import { ICreateAppointment } from "../../../interfaces/appointment.interface";
import { AppointmentAmounts } from "./calculateAppointmentAmounts";

export const createAppointment = async (
  client: any,
  data: ICreateAppointment,
  userId: number,
  amounts: AppointmentAmounts
) => {
  const appointmentRepo = new CreateAppointmentRepository(client);

  const appointment = await appointmentRepo.create({
    ...data,
    user_id: userId,
    doctor_notes: data.doctor_notes ?? null,
    patient_coupon_id: data.patient_coupon_id ?? null,
    coupon_id: data.coupon_id ?? null,
    original_amount: amounts.originalAmount,
    discount_amount: amounts.discountAmount,
    final_amount: amounts.finalAmount,
    points_earned: amounts.pointsEarned,
  });

  return appointment;
};