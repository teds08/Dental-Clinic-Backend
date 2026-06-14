import { SaveOtpRepository , CreateSessionRepository} from "../../repositories/auth/index";
import {FindEmailUserRepository} from "../../repositories/user/find.email"
import crypto from "crypto";
import {transporter} from "../../config/node_mailer";


export class ForgotPasswordAuthService {
  private findEmailUserRepository = new FindEmailUserRepository();
  private saveOtpRepository = new SaveOtpRepository();
  private createSessionRepository = new CreateSessionRepository();


   async requestOtp(email: string) {
  const user = await this.findEmailUserRepository.findByEmail(email);

  if (!user) throw new Error("User not found");

  const otp = crypto.randomInt(100000, 999999).toString();

  const sessionId = crypto.randomUUID();

  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await this.saveOtpRepository.saveOTP(email, otp, expires);

  await this.createSessionRepository.createSession(
    sessionId,
    email,
    expires
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Code",
    html: `<h1>${otp}</h1><p>Expires in 10 minutes</p>`
  });

  return { sessionId };
}
}