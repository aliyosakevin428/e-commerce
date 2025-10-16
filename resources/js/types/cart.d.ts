import { Product } from './product';
import { User } from './user';

export type Cart = {
  id: number;
  product_id: Product['id'];
  product: Product;
  user_id: User['id'];
  user: User;
  qty: number;
  created_at: string;
  updated_at: string;
};
