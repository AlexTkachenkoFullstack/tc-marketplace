import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from 'redux/store';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://backend-production-7a95.up.railway.app/api/v1/',
});

export const setAuthHeader = (token:string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchViewedCars = createAsyncThunk(
  'cars/getViewed',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;;
    const persistToken = state.auth.token;
    if (persistToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistToken);
      const response = await instance(`main/recently-viewed`);
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