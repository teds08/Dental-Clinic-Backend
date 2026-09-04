export interface ITestimonial {
  id?: number;
  user_id: number;
  rating: number;
  testimonial: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ICreateTestimonial {
  rating: number;
  testimonial: string;
}

export interface IUpdateTestimonial {
  rating?: number;
  testimonial?: string;
}
