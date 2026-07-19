import { CategoryType } from './category.model';

export interface Transaction {
  id: string;
  type: CategoryType;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}
