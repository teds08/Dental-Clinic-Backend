import bcrypt from "bcrypt";
import { OtpPasswordUpdateRepository, GetSessionRepository, DeleteSessionRepository} from "../../repositories/auth/index";






export class ResetPasswordAuthService {

  private otpPasswordUpdateRepository = new OtpPasswordUpdateRepository();
  private getSessionRepository = new GetSessionRepository();
  private deleteSessionRepository = new DeleteSessionRepository();

    
  async resetPassword(
  sessionId: string,
  newPassword: string,
  confirmPassword: string
) {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const session = await this.getSessionRepository.getSession(sessionId);

  if (!session) throw new Error("Session not found or expired");

  if (!session.otp_verified) {
    throw new Error("OTP not verified");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await this.otpPasswordUpdateRepository.updatePassword(session.email, hashed);

  await this.deleteSessionRepository.deleteSession(sessionId);
}
}