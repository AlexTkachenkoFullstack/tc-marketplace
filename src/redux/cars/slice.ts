import { createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';
import { fetchNewCars, fetchPopularCars, fetchViewedCars } from './operations';
import { ICar } from 'types/IСar';

  interface CarsState {
    recentlyViewedCars:ICar[] | [];
    popularCars: ICar[] | [];
    newCars:ICar[] | [],
    error: unknown;
    isLoading:boolean;
  }

const initialState:CarsState = {
    recentlyViewedCars:[],
    popularCars:[],
    newCars:[],
    error: null,
    isLoading: false,
  };


  const handlePending=(state:CarsState) => {
    state.isLoading = true;
  }

  const handleRejected = (state: CarsState, action: PayloadAction<unknown>) => {
    state.isLoading = false; 
   if (typeof action.payload === 'object' && action.payload && 'errorMessage' in action.payload) {
      const errorMessage = action.payload as { errorMessage: { errorMessage: string } };
      state.error = errorMessage.errorMessage.errorMessage;
    } else {
      state.error = 'Something went wrong';
    }
};

const handleFulfildGetViewed=(state:CarsState, action: PayloadAction<ICar[]>) => {
  state.isLoading = false;
  state.error = null;
  state.recentlyViewedCars = [...state.recentlyViewedCars, ...action.payload]; 
  }

  const handleFulfildGetNew=(state:CarsState, action: PayloadAction<ICar[]>) => {
    state.isLoading = false;
    state.error = null;
    state.newCars = [...state.newCars, ...action.payload]; 
    }

    const handleFulfildGetPopular=(state:CarsState, action: PayloadAction<ICar[]>) => {
      state.isLoading = false;
      state.error = null;
      state.popularCars = [...state.popularCars, ...action.payload]; 
      }

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchNewCars.fulfilled, handleFulfildGetNew)
          .addCase(fetchPopularCars.fulfilled, handleFulfildGetPopular)
          .addCase(fetchViewedCars.fulfilled, handleFulfildGetViewed)
          .addMatcher(isAnyOf(fetchNewCars.pending,fetchPopularCars.pending,fetchViewedCars.pending), handlePending)
          .addMatcher(isAnyOf(fetchNewCars.rejected,fetchPopularCars.rejected,fetchViewedCars.rejected), handleRejected)
      },
  });
