import { UpdateUserRepository } from "../../repositories/admin/index";
import { hashPassword } from "../../utils/password.bcrypt";

export class AdminUpdateUserService {
  private repo = new UpdateUserRepository();

  async adminUpdateUser(
    userId: number,
    data: {
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
      contact_number?: string;
      role_id?: number;
      date_of_birth?: string;
      address?: string;
      gender?: string;
      emergency_contact?: string;
      emergency_contact_number?: string;
    },
    adminId: number,
  ) {
    if (userId === adminId && data.role_id === 2) {
      throw new Error("You cannot remove your own admin privileges.");
    }

    let updateData = { ...data };

    if (data.password) {
      const hashedPassword = await hashPassword(data.password);

      updateData = {
        ...data,
        password: hashedPassword,
      };
    }

    return await this.repo.update(userId, updateData);
  }
}
