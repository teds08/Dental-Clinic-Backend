import {FindAppointmentDetailsRepository} from "../../repositories/appointment/index";

export class FindAppointmentDetailsService {

  private repo = new FindAppointmentDetailsRepository();

  async getAppointment(appointmentId: number, userId: number) {

    const appointment = await this.repo.findById( appointmentId, userId );

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    return appointment;

  }

}