import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import axios, { AxiosError } from 'axios';

import { KnownError } from 'redux/auth/operations';

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/user-page/',
});

const setAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchMyActiveAds = createAsyncThunk(
  'profile/getActiveAds',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to fetch adverts');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance(`my-transports`, {
        params: { status: 'active' },
      });
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchMyPendingAds = createAsyncThunk(
  'profile/getPendingAds',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to fetch adverts');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance(`my-transports`, {
        params: { status: 'pending' },
      });
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchMyInactiveAds = createAsyncThunk(
  'profile/getInactiveAds',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to fetch adverts');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance(`my-transports`, {
        params: { status: 'inactive' },
      });
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchMyDeletedAds = createAsyncThunk(
  'profile/getDeletedAds',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to fetch adverts');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance(`my-transports`, {
        params: { status: 'deleted' },
      });
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchMyAdsCount = createAsyncThunk(
  'profile/count',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to fetch count');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance(`my-transports/count`);
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const changeTransportStatus = createAsyncThunk(
  'profile/cnangeStatus',
  async (params: { id: number; transportStatus: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('Unable to change status');
    }
    try {
      setAuthHeader(persistToken);
      const { data } = await instance.put(
        `my-transports/${params.id}/update-status/${params.transportStatus}`,
      );
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);
