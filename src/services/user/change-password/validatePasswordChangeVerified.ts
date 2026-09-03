export const validatePasswordChangeVerified = (
  isVerified: boolean
): void => {
  if (!isVerified) {
    throw new Error("OTP verification required");
  }
};