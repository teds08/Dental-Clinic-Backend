import { CreateUserRepository } from "../../repositories/user/index";
import { IUser } from "../../interfaces/user.interface";
import { hashPassword } from "../../utils/password.bcrypt";
import jwt from "jsonwebtoken";

export class CreateUserService {
  private repo = new CreateUserRepository();

  async register(data: IUser) {
    const hashedPassword = await hashPassword(data.password);

    const user = await this.repo.create({
      ...data,
      password: hashedPassword,
      role_id: 2,
    });

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact_number: user.contact_number,
        role_id: user.role_id,
      },
      token,
    };
  }
}
