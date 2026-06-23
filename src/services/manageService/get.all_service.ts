import {GetAllServiceRepository} from "../../repositories/admin/index";

export class GetAllServiceService {

  private repo = new GetAllServiceRepository();


  async getAllServices() {

    const services =
      await this.repo.getAll();


    return services;

  }

}