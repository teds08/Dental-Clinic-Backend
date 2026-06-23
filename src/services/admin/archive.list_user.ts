import {FindArchiveUsersRepository} from "../../repositories/admin/index";


export class FindArchiveUsersService {

  private repo = new FindArchiveUsersRepository();

  async getArchivedUsers() {

    const users = await this.repo.findArchivedUsers();

    return {
      message: "Archived users fetched successfully",
      users
    };
  }

}