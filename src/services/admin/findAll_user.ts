import { FindAllRepository } from "../../repositories/manage-users/index";

export class FindAllUserAdminService {
  private findAllRepository = new FindAllRepository();

  async getUsers() {
    const users = await this.findAllRepository.findAll();


    return users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact_number: user.contact_number,
      role: user.role_name,
      created_at: user.created_at,
      updated_at: user.updated_at
    }));
  }
}