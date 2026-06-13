import { SoftDeleteRepository } from "../../repositories/admin/index";

export class SoftDeleteUserAdminService {
  private softDeleteRepository = new SoftDeleteRepository();

 async softDeleteUser(id: number) {
  return await this.softDeleteRepository.softDelete(id);
}

}