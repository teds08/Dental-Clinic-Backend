export const validateOTPExpiry = (otpExpiresAt: Date | null | undefined): void => {
  if (otpExpiresAt && new Date(otpExpiresAt) < new Date()) {
    throw new Error("OTP expired");
  }
};