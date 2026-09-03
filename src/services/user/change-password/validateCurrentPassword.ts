import bcrypt from "bcrypt";

export const validateCurrentPassword = async (
  providedPassword: string,
  storedHashedPassword: string
): Promise<void> => {
  const isMatch = await bcrypt.compare(providedPassword, storedHashedPassword);

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }
};