import { UpdateUserRepository } from "../../repositories/user/index";

export class UpdateUserService {
  private repo = new UpdateUserRepository();

 async updateUser(id: number, data: any) {
  return await this.repo.update(id, data);
}
}