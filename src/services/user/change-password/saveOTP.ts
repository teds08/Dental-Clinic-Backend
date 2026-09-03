import { AuthenticatedPasswordChangeRepository } from "../../../repositories/user/index";

export const saveOTP = async (
  userId: number,
  otp: string
) => {
  const authRepo = new AuthenticatedPasswordChangeRepository();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await authRepo.savePasswordChangeOTP(userId, otp, expiresAt);
};