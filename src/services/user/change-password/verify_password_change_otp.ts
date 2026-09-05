import {
  AuthenticatedPasswordChangeRepository,
  FindByIdRepository,
} from "../../../repositories/user/index";

const authRepo = new AuthenticatedPasswordChangeRepository();
const findByIdRepo = new FindByIdRepository();

export class VerifyPasswordChangeOTPService {
  async execute(userId: number, otp: string) {
    // Validate user exists
    const user = await findByIdRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check OTP expiry
    if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
      throw new Error("OTP expired");
    }

    // Validate OTP code
    if (user.otp_code !== otp) {
      throw new Error("Invalid OTP");
    }

    // Mark as verified
    await authRepo.verifyPasswordChangeOTP(userId);

    return { message: "OTP verified" };
  }
}
