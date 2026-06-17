import bcrypt from "bcrypt";
import crypto from "crypto";
import {transporter} from "../../config/node_mailer";
import { AuthenticatedPasswordChangeRepository , FindByIdRepository } from "../../repositories/user/index";



export class AuthenticatedPasswordChangeService {
  private AuthRepo = new AuthenticatedPasswordChangeRepository();
  private FindByIdRepo = new FindByIdRepository();
 
    // Send OTP to user's email for password change verification
    async sendPasswordChangeOTP(userId: number) {
  const user = await this.FindByIdRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const otp =
    crypto.randomInt(100000, 999999).toString();

  const expiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  await this.AuthRepo.savePasswordChangeOTP(
    userId,
    otp,
    expiresAt
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Change OTP",
    html: `
      <h1>${otp}</h1>
      <p>Expires in 10 minutes.</p>
    `
  });

  return {
    message: "OTP sent successfully"
  };
}

    // Verify the OTP provided by the user for password change
    async verifyPasswordChangeOTP(userId: number, otp: string) {
  const user =
    await this.FindByIdRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (
    user.otp_expires_at &&
    new Date(user.otp_expires_at) < new Date()
  ) {
    throw new Error("OTP expired");
  }

  if (user.otp_code !== otp) {
    throw new Error("Invalid OTP");
  }

  await this.AuthRepo.verifyPasswordChangeOTP(
    userId
  );

  return {
    message: "OTP verified"
  };
}

    // Change the user's password after OTP verification
    async changePassword(userId: number, currentPassword: string, newPassword: string, confirmPassword: string) {
  const user =
    await this.FindByIdRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password_change_verified) {
    throw new Error(
      "OTP verification required"
    );
  }

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await this.AuthRepo.updatePassword(
    user.id,
    hashedPassword
  );

  await this.AuthRepo.clearPasswordChangeVerification(
    userId
  );

  return {
    message: "Password changed successfully"
  };
}


    async resendOTP(userId: number) {
  const user =
    await this.FindByIdRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (
    user.otp_resend_available_at &&
    new Date(user.otp_resend_available_at) > new Date()
  ) {
    throw new Error(
      "Please wait 5 minutes before requesting another OTP"
    );
  }

  const otp =
    crypto.randomInt(100000, 999999).toString();

  const otpExpiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  const resendAvailableAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await this.AuthRepo.updatePasswordChangeOTP(
    userId,
    otp,
    otpExpiresAt,
    resendAvailableAt
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Change OTP",
    html: `
      <h2>Password Change Verification</h2>
      <p>Your OTP Code:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `
  });

  return {
    message: "OTP resent successfully"
  };
}

}