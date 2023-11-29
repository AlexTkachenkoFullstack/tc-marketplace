/* eslint-disable import/no-cycle */
import { ProductCategory } from '.';

export interface ApiOptions {
  productCategory: ProductCategory;
  searchParams: URLSearchParams | string;
}
