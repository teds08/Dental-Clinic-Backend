import { transporter } from "../../../config/node_mailer";

export const sendOTPEmail = async (
  userEmail: string,
  otp: string,
  isResend: boolean = false
) => {
  const subject = "Password Change OTP";
  const html = isResend
    ? `
      <h2>Password Change Verification</h2>
      <p>Your OTP Code:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `
    : `
      <h1>${otp}</h1>
      <p>Expires in 10 minutes.</p>
    `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    html,
  });
};