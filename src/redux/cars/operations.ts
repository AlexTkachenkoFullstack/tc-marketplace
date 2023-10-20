import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://backend-production-7a95.up.railway.app/api/v1/',
});


export const fetchViewedCars = createAsyncThunk(
  'cars/getViewed',
  async (_, thunkAPI) => {
    try {
      
      const response = await instance(`main/new-transports`); /* заменить на просмотренные */
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
  async (_, thunkAPI) => {
    try {
      
      const response = await instance(`main/new-transports`);
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
  async (_, thunkAPI) => {
    try {
      
      const response = await instance(`main/popular-transports`);
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