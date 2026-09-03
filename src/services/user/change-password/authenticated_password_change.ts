import { validateUser } from "./validateUser";
import { generateOTP } from "./generateOTP";
import { saveOTP } from "./saveOTP";
import { sendOTPEmail } from "./sendOTPEmail";
import { validateOTPExpiry } from "./validateOTPExpiry";
import { validateOTPCode } from "./validateOTPCode";
import { markOTPAsVerified } from "./markOTPAsVerified";
import { validatePasswordChangeVerified } from "./validatePasswordChangeVerified";
import { validateCurrentPassword } from "./validateCurrentPassword";
import { validatePasswordsMatch } from "./validatePasswordsMatch";
import { hashPassword } from "./hashPassword";
import { updatePassword } from "./updatePassword";
import { clearPasswordChangeVerification } from "./clearPasswordChangeVerification";
import { checkResendCooldown } from "./checkResendCooldown";
import { updateOTP } from "./updateOTP";

export class AuthenticatedPasswordChangeService {
  // Send OTP to user's email for password change verification
  async sendPasswordChangeOTP(userId: number) {
    // Step 1: Validate user exists
    const user = await validateUser(userId);

    // Step 2: Generate OTP
    const otp = generateOTP();

    // Step 3: Save OTP
    await saveOTP(userId, otp);

    // Step 4: Send OTP email
    await sendOTPEmail(user.email, otp);

    return { message: "OTP sent successfully" };
  }

  // Verify the OTP provided by the user for password change
  async verifyPasswordChangeOTP(userId: number, otp: string) {
    // Step 1: Validate user exists
    const user = await validateUser(userId);

    // Step 2: Validate OTP expiry
    validateOTPExpiry(user.otp_expires_at);

    // Step 3: Validate OTP code
    validateOTPCode(user.otp_code, otp);

    // Step 4: Mark OTP as verified
    await markOTPAsVerified(userId);

    return { message: "OTP verified" };
  }

  // Change the user's password after OTP verification
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    // Step 1: Validate user exists
    const user = await validateUser(userId);

    // Step 2: Validate password change is verified
    validatePasswordChangeVerified(user.password_change_verified);

    // Step 3: Validate current password
    await validateCurrentPassword(currentPassword, user.password);

    // Step 4: Validate new passwords match
    validatePasswordsMatch(newPassword, confirmPassword);

    // Step 5: Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Step 6: Update password
    await updatePassword(userId, hashedPassword);

    // Step 7: Clear password change verification
    await clearPasswordChangeVerification(userId);

    return { message: "Password changed successfully" };
  }

  // Resend OTP for password change verification
  async resendOTP(userId: number) {
    // Step 1: Validate user exists
    const user = await validateUser(userId);

    // Step 2: Check resend cooldown
    checkResendCooldown(user.otp_resend_available_at);

    // Step 3: Generate new OTP
    const otp = generateOTP();

    // Step 4: Update OTP
    await updateOTP(userId, otp);

    // Step 5: Send OTP email
    await sendOTPEmail(user.email, otp, true);

    return { message: "OTP resent successfully" };
  }
}