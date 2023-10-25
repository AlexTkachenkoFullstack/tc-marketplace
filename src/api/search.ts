import { client } from './../helpers/fetchClients';
// import {
//   ProductCategory,
// } from '../types';
import Category from 'types/Category';

export const getProductCategories = () => {
  return client.get<Category[]>(`/type`);
};

export const getRegions = () => {
  return client.get<string[]>(`/cities`);
};

export const getBrands = () => {
  return client.get<string[]>(`/brand`);
};

export const getModels = (brandId: string) => {
  return client.get<string[]>(`/model/${brandId}`);
};
