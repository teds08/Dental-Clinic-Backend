import { AuthenticatedPasswordChangeRepository } from "../../../repositories/user/index";

export const updateOTP = async (
  userId: number,
  otp: string
) => {
  const authRepo = new AuthenticatedPasswordChangeRepository();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const resendAvailableAt = new Date(Date.now() + 5 * 60 * 1000);

  await authRepo.updatePasswordChangeOTP(
    userId,
    otp,
    otpExpiresAt,
    resendAvailableAt
  );
};