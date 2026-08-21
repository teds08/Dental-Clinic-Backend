import { UpdateUserRepository } from "../../repositories/user/index";

export class UpdateUserService {

  private repo = new UpdateUserRepository();

  async updateUser(
    id: number,
    data: {
      first_name?: string;
      last_name?: string;
      contact_number?: string;
      date_of_birth?: string | null;
      address?: string | null;
      gender?: string | null;
      emergency_contact?: string | null;
      emergency_contact_number?: string | null;
    }
  ) {

    const user = await this.repo.update(
      id,
      data
    );

    if (!user) {

      throw new Error(
        "User not found."
      );

    }

    return user;

  }

}