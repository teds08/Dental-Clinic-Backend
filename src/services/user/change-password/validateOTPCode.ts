export const validateOTPCode = (
  storedOTP: string | null,
  providedOTP: string
): void => {
  if (storedOTP !== providedOTP) {
    throw new Error("Invalid OTP");
  }
};