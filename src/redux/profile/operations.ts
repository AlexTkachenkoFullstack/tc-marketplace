import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import  { AxiosError } from 'axios';

import { KnownError, instance, setAuthHeader } from 'redux/auth/operations';
// import { ISearchParams } from 'types/ISearchParam';
// import { SearchParams } from 'types';

// const instance = axios.create({
//   baseURL: 'https://api.pawo.space/api/v1/',
// });

// const setAuthHeader = (token: string) => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

export const fetchMyActiveAds = createAsyncThunk(
  'profile/getActiveAds',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
        const { data } = await instance(`user-page/my-transports`, {
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
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance(`user-page/my-transports`, {
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
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance(`user-page/my-transports`, {
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
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance(`user-page/my-transports`, {
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
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance(`user-page/my-transports/count`);
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
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance.put(
        `user-page/my-transports/${params.id}/update-status/${params.transportStatus}`,
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

export const saveSubscription = createAsyncThunk(
  'profile/saveSubscription',
  async (requestSearch: any, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance.post('subscriptions', requestSearch);
      console.log('data', data);
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
