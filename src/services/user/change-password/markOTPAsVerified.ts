import { AuthenticatedPasswordChangeRepository } from "../../../repositories/user/index";

export const markOTPAsVerified = async (userId: number) => {
  const authRepo = new AuthenticatedPasswordChangeRepository();
  await authRepo.verifyPasswordChangeOTP(userId);
};