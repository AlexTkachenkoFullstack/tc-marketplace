import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { instance, setAuthHeader } from 'redux/auth/operations';
import { RootState } from 'redux/store';

export type KnownError = {
  errorMessage: string;
};

// const instance = axios.create({
//   baseURL: 'https://api.pawo.space/api/v1/',
// });

// export const setAuthHeader = (token:string) => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const fetchViewedCars = createAsyncThunk(
  'cars/getViewed',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const response = await instance(`main/recently-viewed`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchNewCars = createAsyncThunk(
  'cars/getNew',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
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
  },
);

export const fetchPopularCars = createAsyncThunk(
  'cars/getPopular',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
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
  },
);

export const getCarDetails = createAsyncThunk(
  'cars/getCarDetails',
  async (id: string, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const response = await instance.get(`transport/details/${id}?`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const addToFavourites = createAsyncThunk(
  'cars/addToFavourites',
  async (id: number, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const response = await instance.put(`catalog/favorite-add/${id}`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const removeFromFavourites = createAsyncThunk(
  'cars/removeFromFavourites',
  async (id: number, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const response = await instance.delete(`catalog/favorite-remove/${id}`);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);
export const fetchFavoriteCars = createAsyncThunk(
  'cars/fetchFavoriteCars',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const response = await instance.get('main/favorite-transports');
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);