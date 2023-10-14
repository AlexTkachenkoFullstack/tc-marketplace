import { createSlice} from '@reduxjs/toolkit';
import { fetchNewCars } from './operations';

interface Car {
    id: number;
    type: string;
  }
  
  interface CarsState {
    recentlyViewedCars:Car[] | [];
    popularCars: Car[] | [];
    newCars:Car[] | [],
    error: string | null;
    isLoading:boolean;
  }

const initialState:CarsState = {
    recentlyViewedCars:[],
    popularCars:[],
    newCars:[],
    error: null,
    isLoading: false,
  };

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchNewCars.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.newCars = action.payload.data; 
            })
          .addCase(fetchNewCars.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchNewCars.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ? JSON.stringify(action.payload) : null;
          });
      },
  });
