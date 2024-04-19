import { IModel } from './IModel';

type CarBrand = {
  brandId: number;
  models: IModel[];
};

type ModelListType = CarBrand[] | [];

export default ModelListType;
