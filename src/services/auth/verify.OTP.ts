import {SessionRepository, ForgotPasswordRepository} from "../../repositories/auth/index";
import {FindEmailUserRepository} from "../../repositories/user/index";


export class VerifyOtpAuthService {
  private sessionRepository = new SessionRepository();
  private findEmailUserRepository = new FindEmailUserRepository();
  private forgotPasswordRepository = new ForgotPasswordRepository();

  
  async verifyOtp(sessionId: string, otp: string) {
  const session = await this.sessionRepository.getSession(sessionId);

  if (!session) throw new Error("Session not found or expired");

  const user = await this.findEmailUserRepository.findByEmail(session.email);

  if (!user) throw new Error("User not found");

  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    throw new Error("Too many attempts. Try again later");
  }

  if (
    user.otp_expires_at &&
    new Date(user.otp_expires_at) < new Date()
  ) {
    throw new Error("OTP expired");
  }

  if (user.otp_code !== otp) {
    await this.forgotPasswordRepository.incrementOtpAttempts(user.email);

    const attempts = (user.otp_attempts ?? 0) + 1;

    if (attempts >= 5) {
      await this.forgotPasswordRepository.lockUser(user.email);
    }

    throw new Error("Invalid OTP");
  }

  await this.forgotPasswordRepository.verifySession(sessionId);
}
}