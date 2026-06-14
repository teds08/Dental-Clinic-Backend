import { CreateUserRepository } from "../../repositories/user/index";
import { IUser } from "../../interfaces/user.interface";
import { hashPassword } from "../../utils/password.bcrypt";


export class AdminCreateUserService {
  private repo = new CreateUserRepository();

  async adminCreateUser(data: IUser) {
  const hashedPassword = await hashPassword(
    data.password
  );

  return await this.repo.create({
    ...data,
    password: hashedPassword
  });
}
}