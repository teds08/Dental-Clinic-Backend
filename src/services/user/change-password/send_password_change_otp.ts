import crypto from "crypto";
import { transporter } from "../../../config/node_mailer";
import {
  AuthenticatedPasswordChangeRepository,
  FindByIdRepository,
} from "../../../repositories/user/index";

const authRepo = new AuthenticatedPasswordChangeRepository();
const findByIdRepo = new FindByIdRepository();

export class SendPasswordChangeOTPService {
  async execute(userId: number) {
    // Validate user exists
    const user = await findByIdRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP
    await authRepo.savePasswordChangeOTP(userId, otp, expiresAt);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Change OTP",
      html: `
        <h1>${otp}</h1>
        <p>Expires in 10 minutes.</p>
      `,
    });

    return { message: "OTP sent successfully" };
  }
}
