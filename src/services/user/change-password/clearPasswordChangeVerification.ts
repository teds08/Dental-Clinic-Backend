import { AuthenticatedPasswordChangeRepository } from "../../../repositories/user/index";

export const clearPasswordChangeVerification = async (userId: number) => {
  const authRepo = new AuthenticatedPasswordChangeRepository();
  await authRepo.clearPasswordChangeVerification(userId);
};