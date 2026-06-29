import { ForgotPasswordRepository , SessionRepository} from "../../repositories/auth/index";
import {FindEmailUserRepository} from "../../repositories/user/index";
import crypto from "crypto";
import {transporter} from "../../config/node_mailer";


export class ForgotPasswordAuthService {
  private findEmailUserRepository = new FindEmailUserRepository();
  private forgotPasswordRepository = new ForgotPasswordRepository();
  private sessionRepository = new SessionRepository();


   async requestOtp(email: string) {
  const user = await this.findEmailUserRepository.findByEmail(email);

  if (!user) throw new Error("User not found");
  

  const otp = crypto.randomInt(100000, 999999).toString();

  const sessionId = crypto.randomUUID();

  const expires = new Date(Date.now() + 10 * 60 * 1000);


  
  await this.forgotPasswordRepository.saveOTP(email, otp, expires);

  // Delete Old Sessions and Create New Session
  await this.sessionRepository.deleteOldSession(email);
  await this.sessionRepository.createSession(
    sessionId,
    email,
    expires
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Code",
    html: `
<div style="font-family:monospace;max-width:380px;margin:40px auto;padding:32px;background:#111;border-radius:12px;text-align:center;">
  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;color:#666;text-transform:uppercase;">Your verification code</p>
  <h1 style="margin:0 0 24px;font-size:48px;font-weight:700;color:#fff;letter-spacing:0.1em;">${otp}</h1>
  <p style="margin:0;font-size:13px;color:#555;">Expires in <span style="color:#aaa;">10 minutes</span></p>
</div>
`

  });

  return { sessionId };
}
}