import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://backend-production-448a.up.railway.app/api/v1/',
});

export const fetchTypes = createAsyncThunk(
    'filter/getTypes',
    async (_, thunkAPI) => {
      try { 
        const response = await instance('main/types'); 
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


  export const fetchRegions = createAsyncThunk(
    'filter/getRegions',
    async (_, thunkAPI) => {
      try { 
        const response = await instance('main/regions'); 
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

  export const fetchBrands = createAsyncThunk(
    'filter/getBrands',
    async (_, thunkAPI) => {
      try { 
        const response = await instance('main/brands'); 
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