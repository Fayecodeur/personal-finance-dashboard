export type CategoryType = 'revenu' | 'depense';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}
