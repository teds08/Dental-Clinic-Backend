export interface IService {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  image_public_id: string;
  points: number;
  duration_minutes: number;

  category:
    | "Preventive"
    | "Restorative"
    | "Cosmetic"
    | "Surgical"
    | "Orthodontics"
    | "Prosthetic";

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface IUpdateService {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  image_public_id?: string;
  points?: number;
  duration_minutes?: number;

  category?:
    | "Preventive"
    | "Restorative"
    | "Cosmetic"
    | "Surgical"
    | "Orthodontics"
    | "Prosthetic";

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
