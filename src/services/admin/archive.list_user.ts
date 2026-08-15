import {FindArchiveUsersRepository} from "../../repositories/manage-users/index";


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