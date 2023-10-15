import { RootState } from "redux/store";
export const getViewedCars = (state: RootState) => state.cars.recentlyViewedCars;
export const getNewCars = (state: RootState) => state.cars.newCars;
export const getPopularCars = (state: RootState) => state.cars.popularCars;
export const getIsLoading =(state: RootState)=> state.cars.isLoading;
export const getError =(state: RootState)=> state.cars.error;