import { AuthenticatedPasswordChangeRepository } from "../../../repositories/user/index";

export const updatePassword = async (
  userId: number,
  hashedPassword: string
) => {
  const authRepo = new AuthenticatedPasswordChangeRepository();
  await authRepo.updatePassword(userId, hashedPassword);
};