import jwt from "jsonwebtoken";

export const generateToken = (
  payload: {
    id: number;
    role_id: number;
  }
): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d"
    }
  );
};