import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchCars,
  fetchBrands,
  fetchCity,
  fetchFiltredCars,
  fetchModels,
  fetchRegions,
  fetchTypes,
  hideTransport,
} from './operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ICities } from 'types/ICities';
import { ICar, IFiltredCarsPayload } from 'types/IСar';
import { addToFavourites, removeFromFavourites } from 'redux/cars/operations';
import ModelListType from 'types/ModelListType';
import { act } from 'react-dom/test-utils';

interface IFilterState {
  regions: IRegion[] | [];
  cities: ICities[] | [];
  types: IType[] | [];
  brand: IBrand[] | [];
  models: IModel[] | [];
  carsList: ModelListType | [];
  error: unknown;
  isLoading: boolean;
  select: {
    transportTypeId: number | null;
    brandId: number[] | null;
    modelId: number[] | [];
    regionId: number[] | [];
  };
  filtredCars: ICar[] | [];
  totalAdverts: number | null;
  paramsForSubscr: {
    selectedCategory: string;
    carMark: string | string[];
    carModel: string | string[];
    carBody: string | string[];
    year: { from: number; to: number };
    carFuel: string | string[];
    carTransmission: string | string[];
    mileage: { from: number; to: number };
    enginePower: { from: number; to: number };
    carDriveType: string | string[];
    selectedRegions: string | string[];
    selectedCity: string | string[];
    carColor: string | string[];
    carTransportCondition: string | string[];
    numberOfDoors: { from: number; to: number };
    numberOfSeats: { from: number; to: number };
    carNumberAxles: string | string[];
    carWheelConfiguration: string | string[];
    countryDeliver: string | string[];
    price: { from: number; to: number };
    engineDisplacement: { from: number; to: number };
    data: any;
    selectedOption: boolean | undefined;
    selectedName?: string;
    editSubscrId?: number;
    notificationStatus?: boolean;
  };
}

const initialState: IFilterState = {
  regions: [],
  cities: [],
  types: [],
  brand: [],
  models: [],
  carsList: [],
  select: {
    transportTypeId: 1,
    brandId: [],
    modelId: [],
    regionId: [],
  },

  filtredCars: [],
  error: null,
  isLoading: false,
  totalAdverts: null,

  paramsForSubscr: {
    selectedCategory: '',
    carMark: [],
    carModel: [],
    carBody: [],
    year: { from: 1970, to: 2024 },
    carFuel: [],
    carTransmission: [],
    mileage: { from: 0, to: 1000000 },
    engineDisplacement: { from: 0, to: 20 },
    enginePower: { from: 0, to: 1000 },
    carDriveType: [],
    selectedRegions: [],
    selectedCity: [],
    carColor: [],
    carTransportCondition: [],
    numberOfDoors: { from: 2, to: 5 },
    numberOfSeats: { from: 2, to: 18 },
    carNumberAxles: [],
    carWheelConfiguration: [],
    countryDeliver: [],
    price: { from: 100, to: 1000000 },
    data: undefined,
    selectedOption: undefined,
  },
};

const handlePending = (state: IFilterState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: IFilterState,
  action: PayloadAction<unknown>,
) => {
  state.isLoading = false;
};

const handleFulfilledGetRegions = (
  state: IFilterState,
  action: PayloadAction<IRegion[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.regions = action.payload;
};
const handleFulfilledGetCitys = (
  state: IFilterState,
  action: PayloadAction<ICities[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.cities = action.payload;
};

const handleFulfilledGetTypes = (
  state: IFilterState,
  action: PayloadAction<IType[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.types = action.payload;
};

const handleFulfilledGetBrands = (
  state: IFilterState,
  action: PayloadAction<IBrand[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.brand = action.payload;
};

const handleFulfilledGetModels = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.models = action.payload;
};
const handleFulfilledGetCars = (
  state: IFilterState,
  action: PayloadAction<ModelListType>,
) => {
  state.isLoading = false;
  state.error = null;
  state.carsList = action.payload;
};

const handleFulfilledGetFiltredCars = (
  state: IFilterState,
  action: PayloadAction<IFiltredCarsPayload>,
) => {
  state.isLoading = false;
  state.error = null;
  state.filtredCars = [...action.payload.transportSearchResponse];
  state.totalAdverts = action.payload.total;
};
const handleFulfilledHideAdvert = (state: IFilterState) => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledToggleIsFavorite = (
  state: IFilterState,
  action: PayloadAction<number>,
) => {
  const filteredCar = state.filtredCars.find(
    item => item.id === action.payload,
  );

  if (filteredCar) {
    filteredCar.isFavorite = !filteredCar.isFavorite;
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFiltredParams(
      state,
      action: PayloadAction<
        | { transportTypeId: number | null }
        | { brandId: number[] | null }
        | { modelId: number[] }
        | { regionId: number[] }
        | { cityId: number[] }
        | { bodyTypeId: number[] }
        | { fuelTypeId: number[] }
        | { driveTypeId: number[] }
        | { transmissionId: number[] }
        | { colorId: number[] }
        | { conditionId: number[] }
        | { numberAxlesId: number[] }
        | { producingCountryId: number[] }
        | { wheelConfigurationId: number[] }
        | { priceFrom: number }
        | { priceTo: number }
        | { yearsFrom: number }
        | { yearsTo: number }
        | { mileageFrom: number }
        | { mileageTo: number }
        | { engineDisplacementFrom: number }
        | { engineDisplacementTo: number }
        | { enginePowerFrom: number }
        | { enginePowerTo: number }
        | { numberOfDoorsFrom: number }
        | { numberOfDoorsTo: number }
        | { numberOfSeatsFrom: number }
        | { numberOfSeatsTo: number }
        | { bargain: boolean }
        | { orderBy: 'CREATED' | 'PRICE' | 'MILEAGE' }
        | { sortBy: 'ASC' | 'DESC' }
      >,
    ) {
      state.select = { ...state.select, ...action.payload };
    },
    saveParamsForSubscr(
      state,
      action: PayloadAction<
        | { selectedCategory: string }
        | { carMark: string | string[] }
        | { carModel: string | string[] }
        | { selectedRegions: string | string[] }
      >,
    ) {
      state.paramsForSubscr = { ...state.paramsForSubscr, ...action.payload };
    },
    cleanParamsForSubscr(state) {
      state.paramsForSubscr = initialState.paramsForSubscr;
    },
    cleanFiltredStore(state, action: PayloadAction<{ field: string }>) {
      const { field } = action.payload;
      switch (field) {
        case 'carsList':
          return { ...state, carsList: [] };
        case 'cities':
          return { ...state, cities: [] };
        case 'filtredCars':
          return { ...state, filtredCars: [] };
        case 'models':
          return { ...state, models: [] };
        case 'all':
          return (state = initialState);
        default:
          return state;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegions.fulfilled, handleFulfilledGetRegions)
      .addCase(fetchCity.fulfilled, handleFulfilledGetCitys)
      .addCase(fetchTypes.fulfilled, handleFulfilledGetTypes)
      .addCase(fetchBrands.fulfilled, handleFulfilledGetBrands)
      .addCase(fetchModels.fulfilled, handleFulfilledGetModels)
      .addCase(fetchCars.fulfilled, handleFulfilledGetCars)
      .addCase(fetchFiltredCars.fulfilled, handleFulfilledGetFiltredCars)
      .addCase(hideTransport.fulfilled, handleFulfilledHideAdvert)

      .addMatcher(
        isAnyOf(addToFavourites.fulfilled, removeFromFavourites.fulfilled),
        handleFulfilledToggleIsFavorite,
      )
      .addMatcher(
        isAnyOf(
          fetchRegions.pending,
          fetchCity.pending,
          fetchTypes.pending,
          fetchBrands.pending,
          fetchModels.pending,
          fetchCars.pending,
          fetchFiltredCars.pending,
          hideTransport.pending, ////!
        ),
        handlePending,
      )
      .addMatcher(
        isAnyOf(
          fetchRegions.rejected,
          fetchCity.rejected,
          fetchTypes.rejected,
          fetchBrands.rejected,
          fetchModels.rejected,
          fetchCars.rejected,
          fetchFiltredCars.rejected,
          hideTransport.rejected, ////!
        ),
        handleRejected,
      );
  },
});

export const {
  changeFiltredParams,
  cleanFiltredStore,
  saveParamsForSubscr,
  cleanParamsForSubscr,
} = filterSlice.actions;
