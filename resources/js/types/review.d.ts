import { Transaction } from "./transaction";
import { User } from "./user";


export type Review = {
  id: number;
  transaction_id: Transaction['id'];
  transaction: Transaction;
  user_id: User['id'];
  user: User;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};
