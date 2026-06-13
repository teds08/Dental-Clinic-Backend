import {FailedAttemptsUserRepository, LockUserRepository, FindEmailUserRepository, ResetAttemptsUserRepository, } from "../../repositories/user/index";

import { comparePassword } from "../../utils/password.bcrypt";
import { generateToken } from "../../utils/jwt";

export class AuthService {
  private findEmailUserRepository = new FindEmailUserRepository();
  private failedAttemptsUserRepository = new FailedAttemptsUserRepository();
  private lockUserRepository = new LockUserRepository();
  private resetAttemptsUserRepository = new ResetAttemptsUserRepository();
 

 async login(email: string, password: string) {
  const user = await this.findEmailUserRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check cool down
  if (
    user.locked_until &&
    new Date(user.locked_until) > new Date()
  ) {
    throw new Error(
      "Too many login attempts. Try again in 5 minutes."
    );
  }

  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    await this.failedAttemptsUserRepository.incrementFailedAttempts(
      user.id
    );

    const updatedUser =
      await this.findEmailUserRepository.findByEmail(email);

    if (updatedUser.failed_login_attempts >= 5) {
      await this.lockUserRepository.lockAccount(user.id);

      throw new Error(
        "Account locked for 5 minutes due to multiple failed login attempts."
      );
    }

    throw new Error("Invalid credentials");
  }

  await this.resetAttemptsUserRepository.resetLoginAttempts(
    user.id
  );

  const token = generateToken({
    id: user.id,
    role_id: user.role_id
  });

  return { token };
}
}