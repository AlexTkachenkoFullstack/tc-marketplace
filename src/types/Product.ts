// import { ProductCategory } from './ProductCategory';

export interface Product {
  carId: number,
  imgUrlSmall: string | null,
  carBrand: string,
  carModel: string,
  price: number,
  mileage: number,
  city: string,
  transmission: string,
  fuelType: string,
  year: number,
  created: string,
}
