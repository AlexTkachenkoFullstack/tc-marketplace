export interface ISpecializedVehicle{
  id: number,
  bodyType: string,
  importedFrom: string,
  year: number,
  price: number,
  bargain: boolean,
  trade: boolean,
  military: boolean,
  installmentPayment: boolean,
  uncleared: boolean,
  condition: string,
  accidentHistory: boolean,
  vincode: string,
  description: string,
  created: Date,
  lastUpdate: Date,
  color: string,
  region: string,
  city: string,
  mainPhoto: string,
  userName: string,
  model: string,
  brand: string,
  transmission: string,
  fuelType: string,
  fuelConsumptionMixed: number,
  engineDisplacement: number,
  enginePower: number,
  driveType: string,
  mileage: number,
  fuelConsumptionCity: number,
  fuelConsumptionHighway: number,
  numberOfDoors: number,
  numberOfSeats: number,
  loadCapacity: number,
  numberOfAxles: string,
  wheelConfiguration: string
}