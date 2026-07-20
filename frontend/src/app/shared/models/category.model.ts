export type CategoryType = 'revenu' | 'depense';

export interface Category {
  _id: string;
  name: string;
  type: CategoryType;
}
