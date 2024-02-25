import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchBrands,
  fetchCity,
  fetchFiltredCars,
  fetchModels,
  fetchRegions,
  fetchTypes,
} from './operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ICar } from 'types/IСar';
import { ICity } from 'types/ICity';

interface IFilterState {
  regions: IRegion[] | [];
  citys: ICity[] | [];
  types: IType[] | [];
  brand: IBrand[] | [];
  models: IModel[] | [];
  error: unknown;
  isLoading: boolean;
  select: {
    transportTypeId: number | null;
    brandId: number[] | null;
    modelId: number[] | [];
    regionId: number[] | [];
  };
  filtredCars: ICar[] | [];
}

const initialState: IFilterState = {
  regions: [],
  citys: [],
  types: [],
  brand: [],
  models: [],
  select: {
    transportTypeId: 1,
    brandId: [],
    modelId: [],
    regionId: [],
  },
  filtredCars: [],
  error: null,
  isLoading: false,
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

const handleFulfildGetRegions = (
  state: IFilterState,
  action: PayloadAction<IRegion[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.regions = action.payload;
};
const handleFulfildGetCitys = (
  state: IFilterState,
  action: PayloadAction<ICity[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.citys = action.payload;
};

const handleFulfildGetTypes = (
  state: IFilterState,
  action: PayloadAction<IType[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.types = action.payload;
};

const handleFulfildGetBrands = (
  state: IFilterState,
  action: PayloadAction<IBrand[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.brand = action.payload;
};

const handleFulfildGetModels = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.models = action.payload;
};

const handleFulfildGetFiltredCars = (
  state: IFilterState,
  action: PayloadAction<ICar[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.filtredCars = [...state.filtredCars, ...action.payload];
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
        | { enginePowerFrom: number }
        | { enginePowerTo: number }
        | { numberOfDoorsFrom: number }
        | { numberOfDoorsTo: number }
        | { numberOfSeatsFrom: number }
        | { numberOfSeatsTo: number }
        | { bargain: boolean }
      >,
    ) {
      state.select = { ...state.select, ...action.payload };
    },
    cleanFiltredStore(state) {
      state.filtredCars = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegions.fulfilled, handleFulfildGetRegions)
      .addCase(fetchCity.fulfilled, handleFulfildGetCitys)
      .addCase(fetchTypes.fulfilled, handleFulfildGetTypes)
      .addCase(fetchBrands.fulfilled, handleFulfildGetBrands)
      .addCase(fetchModels.fulfilled, handleFulfildGetModels)
      .addCase(fetchFiltredCars.fulfilled, handleFulfildGetFiltredCars)
      .addMatcher(
        isAnyOf(
          fetchRegions.pending,
          fetchCity.pending,
          fetchTypes.pending,
          fetchBrands.pending,
          fetchModels.pending,
          fetchFiltredCars.pending,
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
          fetchFiltredCars.rejected,
        ),
        handleRejected,
      );
  },
});

export const { changeFiltredParams, cleanFiltredStore } = filterSlice.actions;
