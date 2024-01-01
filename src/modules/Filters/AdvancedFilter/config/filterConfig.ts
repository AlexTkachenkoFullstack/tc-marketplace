import { fetchType } from './fetchType';
import { passengerConfig } from './passengerConfig'

export const filterConfig = (typeId: number, fetchedData: fetchType) => {
  switch (typeId) {
    case 1:
      return {
        ...passengerConfig,
        addNewCar: {
          brand: {options: [...fetchedData.transportBrandDTOS]},
          model: {options: [...fetchedData.transportModelDTOS]},
        },
        bodyType: {
          options: [...fetchedData.bodyTypeDTOS]
        },
        transmission: {
          options: [...fetchedData.transmissionDTOS]
        },
        fuelType: {
          options: [...fetchedData.fuelTypeDTOS]
        },
        driveType: {
          options: [...fetchedData.driveTypeDTOS]
        },
        color: {
          options: [...fetchedData.transportColorDTOS]
        },
        condition: {
          options: [...fetchedData.transportConditionDTOS]
        },
        originCountry: {
          options: [...fetchedData.producingCountryDTOS]
        }
      };

    case 2:
      break;

    case 3:
      break;
  }
}
