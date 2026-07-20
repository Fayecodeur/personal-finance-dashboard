import { CategoryType, Category } from './category.model';

export interface Transaction {
  _id: string;
  type: CategoryType;
  amount: number;
  description: string;
  category: Category | string;
  date: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}
