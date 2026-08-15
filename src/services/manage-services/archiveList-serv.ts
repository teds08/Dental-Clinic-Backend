import {ArchiveListRepository} from "../../repositories/manage-services/index";


export class ArchiveListService {

  private repo = new ArchiveListRepository();


  async getArchivedServices() {

    const services = await this.repo.getArchivedServices();


    return services;

  }

}