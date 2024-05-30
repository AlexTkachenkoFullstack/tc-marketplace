import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { AxiosError } from 'axios';

import { KnownError, instance, setAuthHeader } from 'redux/auth/operations';
import { ISearchParams } from 'types/ISearchParam';
import { subscriptionRequestType } from 'types/subscriptionRequestType';
import { paramsSerializer } from 'utils/paramsSerializer';
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

export const changeUserPassword = createAsyncThunk(
  'profile/cnangePassword',
  async (
   params: {
      oldPassword: string;
      password: string;
      confirmPassword: string;
      email: string;
    },
    thunkAPI,
  ) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance.put(`user-page/security-info`, params);
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
  async (
    {
      modifiedRequestSearch,
      subscriptionRequest,
    }: {
      modifiedRequestSearch: ISearchParams;
      subscriptionRequest: subscriptionRequestType;
    },
    thunkAPI,
  ) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    const config = {
      params: modifiedRequestSearch,
      paramsSerializer,
    };
    try {
      const { data } = await instance.post(
        'subscriptions',
        subscriptionRequest,
        config,
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

export const editSubscription = createAsyncThunk(
  'profile/editSubscription',
  async (
    {
      id,
      modifiedRequestSearch,
      subscriptionRequest,
    }: {
      id: number;
      modifiedRequestSearch?: ISearchParams;
      subscriptionRequest?: subscriptionRequestType;
    },
    thunkAPI,
  ) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    const config = {
      params: modifiedRequestSearch,
      paramsSerializer,
    };
    try {
      const { data } = await instance.put(
        `subscriptions/${id}`,
        subscriptionRequest,
        config,
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

export const fetchSubscriptions = createAsyncThunk(
  'profile/fetchSubscription',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance('subscriptions');
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

export const deleteSubscription = createAsyncThunk(
  'profile/deleteSubscription',
  async (id: number, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance.delete(`subscriptions/${id}`);
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

export const fetchCarsBySubscription = createAsyncThunk(
  'profile/getCarsBySubscription',
  async (id: number, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    token && setAuthHeader(token);
    try {
      const { data } = await instance.get(`subscriptions/${id}`);
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
