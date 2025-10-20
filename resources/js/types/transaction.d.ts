import { Courier } from './courier';
import { Review } from './review';
import { User } from './user';

export type TransactionItem = {
  name: string;
  price: string;
  quantity: number;
  image: string;
  product_id: number;
};

export type Transaction = {
  id: number;
  user_id: User['id'];
  code: string;
  user: User;
  courier_id: Courier['id'];
  courier: Courier;
  items: TransactionItem[];
  description: string;
  status: string;
  total_price: number;
  paid: boolean;
  review?: Review;
  media?: Media[];
  created_at: string;
  updated_at: string;
};
