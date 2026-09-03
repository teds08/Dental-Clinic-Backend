export const checkResendCooldown = (
  resendAvailableAt: Date | null | undefined
): void => {
  if (
    resendAvailableAt &&
    new Date(resendAvailableAt) > new Date()
  ) {
    throw new Error("Please wait 5 minutes before requesting another OTP");
  }
};