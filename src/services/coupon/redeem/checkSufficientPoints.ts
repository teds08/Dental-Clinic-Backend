export const checkSufficientPoints = (
  currentBalance: number,
  requiredPoints: number
): void => {
  if (currentBalance < requiredPoints) {
    throw new Error("You do not have enough reward points.");
  }
};