import { GetPatientPointsRepository } from "../../repositories/manage-patient-points/index";

export class GetPatientPointsService {

  private repo = new GetPatientPointsRepository();

  async getPoints(userId: number) {
    const points = await this.repo.findByUserId(userId);
    if (!points) {
      throw new Error("Points account not found.");
    }

    return points;

  }

}