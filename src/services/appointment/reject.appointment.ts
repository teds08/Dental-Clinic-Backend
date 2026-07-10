import {RejectAppointmentRepository, FindAppointmentRepository} from "../../repositories/appointment/index";

export class RejectAppointmentService {

  private repo = new RejectAppointmentRepository();

  private findRepo = new FindAppointmentRepository();

  async reject(id: number) {

    const appointment = await this.findRepo.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.status !== "PENDING") {
      throw new Error(
        "Only pending appointments can be rejected."
      );
    }

    return await this.repo.reject(id);

  }

}