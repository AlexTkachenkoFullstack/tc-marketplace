import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://backend-production-448a.up.railway.app/api/v1/',
});


export const fetchViewedCars = createAsyncThunk(
  'cars/getViewed',
  async ({page,limit}: { page: number; limit: number }, thunkAPI) => {
    try {
      
      const response = await instance(`main/newCars/${page}/${limit}`); /* заменить на просмотренные */
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  }
);


export const fetchNewCars = createAsyncThunk(
  'cars/getNew',
  async ({page,limit}: { page: number; limit: number }, thunkAPI) => {
    try {
      
      const response = await instance(`main/newCars/${page}/${limit}`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  }
);

export const fetchPopularCars = createAsyncThunk(
  'cars/getPopular',
  async ({page,limit}: { page: number; limit: number }, thunkAPI) => {
    try {
      
      const response = await instance(`main/popularCars/${page}/${limit}`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  }
);