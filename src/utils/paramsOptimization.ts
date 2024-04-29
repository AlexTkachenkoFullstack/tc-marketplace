import { ISearchParams } from 'types/ISearchParam';

export const paramsOptimization = (searchParams: ISearchParams) => {
  return Object.fromEntries(
    Object.entries(searchParams).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        if (key.includes('price') && (value === 100 || value === 1000000)) {
          return false;
        } else if (key.includes('year') && (value === 1970 || value === 2024)) {
          return false;
        } else if (key.includes('mileage') && value === 1000000) {
          return false;
        } else if (key.includes('engineDisplacement') && value === 20) {
          return false;
        } else if (key.includes('enginePower') && value === 1000) {
          return false;
        } else if (
          key.includes('numberOfDoors') &&
          (value === 2 || value === 5)
        ) {
          return false;
        } else if (
          key.includes('numberOfSeats') &&
          (value === 2 || value === 18)
        ) {
          return false;
        }
        return value !== undefined && value !== 0;
      }
    }),
  );
};
