import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'http://138.68.113.54:8080/api/v1/',
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
    async (transportTypeId:number, thunkAPI) => {
      try { 
        const config = {
          params: { transportTypeId },
        };
        const response = await instance('main/brands', config); 
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

  export const fetchModels = createAsyncThunk(
    'filter/getModels',
    async ({ transportTypeId, transportBrandId }: { transportTypeId: number, transportBrandId: number }, thunkAPI) => {
      try { 
        const config = {
          params: {transportTypeId, transportBrandId},
        };
        const response = await instance('main/models', config); 
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

  
