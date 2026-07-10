import {IAppointment} from "../../interfaces/appointment.interface";
import {calculateEndTime} from "../../utils/appointment.time";
import {CheckAppointmentOverlapRepository} from "../../repositories/admin/index";
import {FindServiceRepository} from "../../repositories/admin/index";
import {CreateAppointmentRepository} from "../../repositories/appointment/index";


export class CreateAppointmentService {

  private appointmentRepo = new CreateAppointmentRepository();
  private overlapRepo = new CheckAppointmentOverlapRepository();
  private serviceRepo = new FindServiceRepository();

  async createAppointment(
    data: Omit<IAppointment, "user_id">,
    userId: number
  ) {

    // 1. Verify the service exists
    const service = await this.serviceRepo.findById(data.service_id);

    if (!service) {
      throw new Error("Selected service does not exist.");
    }

    // 2. Calculate the appointment end time
    const endTime =
      calculateEndTime(
        data.appointment_time,
        service.duration_minutes
      );

    // 3. Check for overlapping appointments
    const hasConflict = await this.overlapRepo.hasConflict(
        data.appointment_date,
        data.appointment_time,
        endTime
      );

    if (hasConflict) {
      throw new Error(
        "The selected schedule is already occupied."
      );
    }

    // 4. Save the appointment
    const appointment =
      await this.appointmentRepo.create({
        ...data,
        user_id: userId
      });

    return appointment;

  }

}