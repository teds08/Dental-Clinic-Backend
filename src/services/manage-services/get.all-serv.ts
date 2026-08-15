import {GetAllServiceRepository} from "../../repositories/manage-services/index";

export class GetAllServiceService {

  private repo = new GetAllServiceRepository();


  async getAllServices() {

    const services =
      await this.repo.getAll();


    return services;

  }

}