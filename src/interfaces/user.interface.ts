export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  contact_number?: string;
  role_id?: number;
  failed_login_attempts?: number;
  locked_until?: Date | null;
}