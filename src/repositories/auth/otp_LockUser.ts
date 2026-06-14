import { pool } from "../../config/db";


export class LockUserForgotPasswordRepository {

    async lockUser(email: string) {
  await pool.query(
    `
    UPDATE users
    SET locked_until = NOW() + INTERVAL '5 minutes'
    WHERE email = $1
    `,
    [email]
  );
}
}