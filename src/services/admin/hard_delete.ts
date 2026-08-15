import { HardDeleteRepository } from "../../repositories/manage-users/index";

export class HardDeleteUserAdminService {
  private hardDeleteRepository = new HardDeleteRepository();

    async hardDeleteUser(id: number) {
  return await this.hardDeleteRepository.hardDelete(id);
}
}