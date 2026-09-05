import bcrypt from "bcrypt";
import {
  AuthenticatedPasswordChangeRepository,
  FindByIdRepository,
} from "../../../repositories/user/index";

const authRepo = new AuthenticatedPasswordChangeRepository();
const findByIdRepo = new FindByIdRepository();

export class ChangePasswordService {
  async execute(
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    // Validate user exists
    const user = await findByIdRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if OTP verification is done
    if (!user.password_change_verified) {
      throw new Error("OTP verification required");
    }

    // Validate current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    // Validate new passwords match
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await authRepo.updatePassword(user.id, hashedPassword);

    // Clear verification
    await authRepo.clearPasswordChangeVerification(userId);

    return { message: "Password changed successfully" };
  }
}
