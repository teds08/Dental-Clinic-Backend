import bcrypt from "bcrypt";
import { ForgotPasswordRepository, SessionRepository} from "../../repositories/auth/index";






export class ResetPasswordAuthService {

  private forgotPasswordRepository = new ForgotPasswordRepository();
  private sessionRepository = new SessionRepository();

    
  async resetPassword(
  sessionId: string,
  newPassword: string,
  confirmPassword: string
) {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const session = await this.sessionRepository.getSession(sessionId);

  if (!session) throw new Error("Session not found or expired");

  if (!session.otp_verified) {
    throw new Error("OTP not verified");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await this.forgotPasswordRepository.updatePassword(session.email, hashed);

  await this.sessionRepository.deleteSession(sessionId);
}
}