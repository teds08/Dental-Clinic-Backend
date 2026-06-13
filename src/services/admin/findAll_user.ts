import { FindAllRepository } from "../../repositories/admin/index";

export class FindAllUserAdminService {
  private findAllRepository = new FindAllRepository();

  async getUsers() {
    const users = await this.findAllRepository.findAll();


    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      contact_number: user.contact_number,
      role: user.role_name,
      created_at: user.created_at,
      updated_at: user.updated_at
    }));
  }
}