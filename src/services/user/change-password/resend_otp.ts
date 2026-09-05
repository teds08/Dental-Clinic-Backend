import crypto from "crypto";
import { transporter } from "../../../config/node_mailer";
import {
  AuthenticatedPasswordChangeRepository,
  FindByIdRepository,
} from "../../../repositories/user/index";

const authRepo = new AuthenticatedPasswordChangeRepository();
const findByIdRepo = new FindByIdRepository();

export class ResendOTPService {
  async execute(userId: number) {
    // Validate user exists
    const user = await findByIdRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check resend cooldown
    if (
      user.otp_resend_available_at &&
      new Date(user.otp_resend_available_at) > new Date()
    ) {
      throw new Error("Please wait 5 minutes before requesting another OTP");
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const resendAvailableAt = new Date(Date.now() + 5 * 60 * 1000);

    // Update OTP
    await authRepo.updatePasswordChangeOTP(
      userId,
      otp,
      otpExpiresAt,
      resendAvailableAt,
    );

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Change OTP",
      html: `
        <h2>Password Change Verification</h2>
        <p>Your OTP Code:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes.</p>
      `,
    });

    return { message: "OTP resent successfully" };
  }
}
