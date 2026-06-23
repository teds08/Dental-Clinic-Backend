import {ArchiveListRepository} from "../../repositories/admin/index";


export class ArchiveListService {

  private repo = new ArchiveListRepository();


  async getArchivedServices() {

    const services =
      await this.repo.getArchivedServices();


    return services;

  }

}