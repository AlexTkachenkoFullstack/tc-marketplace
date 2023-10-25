import { Product } from './Product';

export interface SuggestedProducts {
  recent: Product[];
  newest: Product[];
  popular: Product[];
}
