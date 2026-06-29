export interface ICoupon {

    name: string;
    type: "EVENT" | "NORMAL";
    discount_percent: number;
    required_points?: number;
    is_active?: boolean;

}