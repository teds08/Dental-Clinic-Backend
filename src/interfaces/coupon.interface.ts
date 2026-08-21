export interface ICoupon {
  id?: number;
  name: string;
  type: "EVENT" | "NORMAL";
  discount_percent: number;
  required_points?: number | null;
  is_active?: boolean;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface IPatientCoupon {
  id?: number;
  user_id: number;
  coupon_id: number;
  status?: "UNUSED" | "USED" | "EXPIRED";
  redeemed_at?: Date;
  used_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
