export const validatePasswordsMatch = (
  newPassword: string,
  confirmPassword: string
): void => {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};