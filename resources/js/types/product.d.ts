import { Media } from '.';
import { Category } from './category';

export type Product = {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  category_id: Category['id'];
  category: Category;
  price: number;
  stock: number;
  media: Media[];
  created_at: string;
  updated_at: string;
};
