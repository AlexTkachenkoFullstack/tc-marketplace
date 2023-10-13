import { client } from './../helpers/fetchClients';
import { getSearchWith } from '../helpers/searchHelper';
import {
  ProductCategory,
  ApiOptions,
  Product,
  SuggestedProducts,
} from '../types';

export const getProducts = ({
  productCategory = '' as ProductCategory,
  searchParams,
}: ApiOptions) => {
  const params = new URLSearchParams(searchParams || '');
  const preparedParams = getSearchWith(params, {
    productType: productCategory,
  });

  const normalizedSearchParams = preparedParams ? `?${preparedParams}` : '';

  return client.get<Product[]>(`/products${normalizedSearchParams}`);
};

export const productsByQuery = (query: string) => {
  return client.get<Product[]>(`/products?search=${query}`);
};

export const getSuggestedProducts = () => {
  return client.get<SuggestedProducts>('/homepage');
};

// export const getProductInfo = (productId: string) => {
//   return client.get<ProductInfo>(`/details/${productId}`);
// };

// export const getProductDescription = (productId: string) => {
//   return client.get<ProductDescription[]>(`/descriptions/${productId}`);
// };

// export const getProductsStats = () => {
//   return client.get<CategoryMap>('/stats');
// };
