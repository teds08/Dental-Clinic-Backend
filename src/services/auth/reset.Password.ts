import bcrypt from "bcrypt";
import {
  ForgotPasswordRepository,
  SessionRepository,
} from "../../repositories/auth/index";
import { IResetPasswordInput } from "../../interfaces/resetPassword.interface";

export class ResetPasswordAuthService {
  private forgotPasswordRepository = new ForgotPasswordRepository();
  private sessionRepository = new SessionRepository();

  async resetPassword(sessionId: string, input: IResetPasswordInput) {
    const { new_password, confirm_password } = input;

    if (new_password !== confirm_password) {
      throw new Error("Passwords do not match");
    }

    const session = await this.sessionRepository.getSession(sessionId);
    if (!session) throw new Error("Session not found or expired");
    if (!session.otp_verified) throw new Error("OTP not verified");

    const hashed = await bcrypt.hash(new_password, 10);
    await this.forgotPasswordRepository.updatePassword(session.email, hashed);
    await this.sessionRepository.deleteSession(sessionId);
  }
}
