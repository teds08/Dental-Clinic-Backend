import { HardDeleteRepository } from "../../repositories/admin/index";

export class HardDeleteUserAdminService {
  private hardDeleteRepository = new HardDeleteRepository();

    async hardDeleteUser(id: number) {
  return await this.hardDeleteRepository.hardDelete(id);
}
}