import { SendPasswordChangeOTPService } from "./send_password_change_otp";
import { VerifyPasswordChangeOTPService } from "./verify_password_change_otp";
import { ChangePasswordService } from "./change_password";
import { ResendOTPService } from "./resend_otp";

export class AuthenticatedPasswordChangeService {
  private sendOTPService = new SendPasswordChangeOTPService();
  private verifyOTPService = new VerifyPasswordChangeOTPService();
  private changePasswordService = new ChangePasswordService();
  private resendOTPService = new ResendOTPService();

  async sendPasswordChangeOTP(userId: number) {
    return this.sendOTPService.execute(userId);
  }

  async verifyPasswordChangeOTP(userId: number, otp: string) {
    return this.verifyOTPService.execute(userId, otp);
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return this.changePasswordService.execute(
      userId,
      currentPassword,
      newPassword,
      confirmPassword,
    );
  }

  async resendOTP(userId: number) {
    return this.resendOTPService.execute(userId);
  }
}
