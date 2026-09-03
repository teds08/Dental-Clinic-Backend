import { FindByIdRepository } from "../../../repositories/user/index";

export const validateUser = async (userId: number) => {
  const findByIdRepo = new FindByIdRepository();
  const user = await findByIdRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};