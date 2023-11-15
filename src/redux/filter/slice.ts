import { createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';
import { fetchBrands, fetchModels, fetchRegions, fetchTypes } from './operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';

interface IFilterState {
    regions:IRegion[] | [],
    types:IType[] | [],
    brand:IBrand[] | [],
    models:IModel[] | [],
    error: unknown;
    isLoading:boolean;
    select:{
      transportTypeId:number | null;
      brandId:number[] | [];
      modelId:number[] | [];
      regionId:number[] | [];
    }
  }

const initialState:IFilterState = {
    regions:[],
    types:[],
    brand:[],
    models:[],
    select:{
      transportTypeId:null,
      brandId:[],
      modelId:[],
      regionId:[]
    },
    error: null,
    isLoading: false,
  };


  const handlePending=(state:IFilterState) => {
    state.isLoading = true;
  }

  const handleRejected = (state: IFilterState, action: PayloadAction<unknown>) => {
    state.isLoading = false; 
};

const handleFulfildGetRegions=(state:IFilterState, action: PayloadAction<IRegion[]>) => {
  state.isLoading = false;
  state.error = null;
  state.regions = action.payload; 
  }

const handleFulfildGetTypes=(state:IFilterState, action: PayloadAction<IType[]>) => {
    state.isLoading = false;
    state.error = null;
    state.types = action.payload; 
    }

const handleFulfildGetBrands=(state:IFilterState, action: PayloadAction<IBrand[]>) => {
    state.isLoading = false;
    state.error = null;
    state.brand = action.payload; 
    }
    
const handleFulfildGetModels=(state:IFilterState, action: PayloadAction<IModel[]>) => {
    state.isLoading = false;
    state.error = null;
    state.models = action.payload; 
    }

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      changeFiltredParams(state, action: PayloadAction<{transportTypeId:number} | {brandId:number[]} | {modelId:number[]} | {regionId:number[]}>) {
        state.select = {...state.select, ...action.payload};
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRegions.fulfilled, handleFulfildGetRegions)
          .addCase(fetchTypes.fulfilled, handleFulfildGetTypes)
          .addCase(fetchBrands.fulfilled, handleFulfildGetBrands)
          .addCase(fetchModels.fulfilled, handleFulfildGetModels)
          .addMatcher(isAnyOf(fetchRegions.pending,fetchTypes.pending, fetchBrands.pending, fetchModels.pending), handlePending)
          .addMatcher(isAnyOf(fetchRegions.rejected, fetchTypes.rejected, fetchBrands.rejected, fetchModels.rejected), handleRejected)
      },
  });

  export const { changeFiltredParams } = filterSlice.actions;