import { Product } from "./product";
import { User } from "./user";


export type Cart = {
  id: number;
  product_id: Product['id'];
  product: Product;
  user_id: User['id'];
  user: User;
  quantity: string;
  created_at: string;
  updated_at: string;
};
