export interface IService {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  image_public_id?: string;
  points: number;
  duration_minutes: number;
}