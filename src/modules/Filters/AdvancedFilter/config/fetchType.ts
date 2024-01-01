export type fetchType = {
  transportBrandDTOS: transportBrandDTOSType[],
  transportModelDTOS: [],
  bodyTypeDTOS: bodyTypeDTOSType[],
  driveTypeDTOS: driveTypeDTOSType[],
  fuelTypeDTOS: fuelTypeDTOSType[],
  producingCountryDTOS: producingCountryDTOSType[],
  transmissionDTOS: transmissionDTOSType[],
  transportColorDTOS: transportColorDTOSType[],
  transportConditionDTOS: transportConditionDTOSType[]
}

type transportBrandDTOSType = {
  transportBrandId: number,
  brand: string,
}

type bodyTypeDTOSType = {
  bodyTypeId: number,
  bodyType: string
}

type driveTypeDTOSType = {
  driveTypeId: number,
  driveType: string
}

type fuelTypeDTOSType = {
  fuelTypeId: number,
  fuelType: string
}

type producingCountryDTOSType = {
  producingCountryId: number,
  producingCountry: string
}

type transmissionDTOSType = {
  transmissionId: number,
  transmission: string
}

type transportColorDTOSType = {
  transportColorId: number,
  transportColor: string
}

type transportConditionDTOSType = {
  transportConditionId: number,
  transportCondition: string
}
