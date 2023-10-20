import { createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';
import { fetchBrands, fetchRegions, fetchTypes } from './operations';
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
  }

const initialState:IFilterState = {
    regions:[],
    types:[],
    brand:[],
    models:[],
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

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchRegions.fulfilled, handleFulfildGetRegions)
          .addCase(fetchTypes.fulfilled, handleFulfildGetTypes)
          .addCase(fetchBrands.fulfilled, handleFulfildGetBrands)
          .addMatcher(isAnyOf(fetchRegions.pending,fetchTypes.pending, fetchBrands.pending), handlePending)
          .addMatcher(isAnyOf(fetchRegions.rejected, fetchTypes.rejected, fetchBrands.rejected), handleRejected)
      },
  });