import {ApproveAppointmentRepository, FindAppointmentRepository} from "../../repositories/appointment/index";

export class ApproveAppointmentService {

  private repo = new ApproveAppointmentRepository();
  private findRepo = new FindAppointmentRepository();

  async approve(id: number) {

    const appointment = await this.findRepo.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.status !== "PENDING") {
      throw new Error(
        "Only pending appointments can be approved."
      );
    }

    return await this.repo.approve(id);

  }

}