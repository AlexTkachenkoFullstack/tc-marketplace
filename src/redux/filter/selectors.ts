import { RootState } from "redux/store";
export const getFilterRegions = (state: RootState) => state.filter.regions;
export const getFilterTypes = (state: RootState) => state.filter.types;
export const getFilterBrands = (state: RootState) => state.filter.brand;