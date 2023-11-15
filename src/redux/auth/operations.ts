import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'http://api.pawo.space/api/v1/',
});

export const setAuthHeader = (token:string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const delAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials:{email: string, password: string}, thunkAPI) => {
    try {
      const response = await instance.post('authorization/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return {
        status: error.response.status,
        errorMessage: error.response.data,
      };
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
  // try {
    const response= await instance.post('authorization/logout');
    console.log('res',response)
    delAuthHeader();
  // } catch (err: any) {
  //   console.error('err',err);
  //   return thunkAPI.rejectWithValue({ errorMessage: 'Failed to log out' });
  // }
});

