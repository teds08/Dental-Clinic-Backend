import { GetProfileRepository } from "../../repositories/user/index";


export class GetProfileService {
  private repo = new GetProfileRepository();

  async getProfile(userId: number) {
  const user = await this.repo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "**************",
    contact_number: user.contact_number,
    date_of_birth: user.date_of_birth,
    address: user.address,
    gender: user.gender,
    emergency_contact: user.emergency_contact,
    emergency_contact_number: user.emergency_contact_number,
    role: user.role_name,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
}
}