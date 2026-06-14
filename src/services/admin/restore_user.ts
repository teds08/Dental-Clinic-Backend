import { RestoreUserRepository } from "../../repositories/admin/index";

export class RestoreUserAdminService {
  private restoreUserRepository = new RestoreUserRepository();
    
  async restoreUser(id: number) {
  const user = await this.restoreUserRepository.restore(id);

  if (!user) {
    throw new Error("Deleted user not found");
  }

  return user;
}
}