import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ISearchParams } from 'types/ISearchParam';
import { paramsSerializer } from './../../utils/paramsSerializer';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/',
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


  export const fetchFiltredCars = createAsyncThunk(
    'cars/getFiltredCar',
    async (searchConfig:{page:number, searchParams:ISearchParams}, thunkAPI) => {
      try {
        const config = {
          params: searchConfig.searchParams,
          paramsSerializer
        };
        const response = await instance(`catalog/search/page/${searchConfig.page}/limit/6/`, config);
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

