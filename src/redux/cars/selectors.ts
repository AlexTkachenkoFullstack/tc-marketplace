import { RootState } from "redux/store";
export const getNewCars = (state: RootState) => state.cars.newCars;
