export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number?: string;
  
  date_of_birth?: string | null;
  address?: string | null;
  gender?: string | null;
  emergency_contact?: string | null;
  emergency_contact_number?: string | null;

  role_id?: number;
  
  failed_login_attempts?: number;
  locked_until?: Date | null;
  password_change_verified?: boolean;
  
  otp_code?: string;
  otp_expires_at?: Date | null;
  otp_attempts?: number;
  otp_resend_available_at?: Date | null;
}