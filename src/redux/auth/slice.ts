import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginThunk, logoutThunk,
} from './operations';

interface IUser{
  user:{name:null | string, email:null | string},
  token:null| string,
  isLoading:boolean,
  error: unknown;
}

const initialState:IUser = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoading: false,
  error: null,
};

const handlePending = (state:IUser) => {
  state.isLoading = true;
};

const handleFulfild = (state:IUser) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state:IUser, action: PayloadAction<unknown>) => {
  state.isLoading = false;
   if (typeof action.payload === 'object' && action.payload && 'errorMessage' in action.payload) {
      const errorMessage = action.payload as { errorMessage: { errorMessage: string } };
      state.error = errorMessage.errorMessage.errorMessage;
    } else {
      state.error = 'Something went wrong';
    }
};

const handleFulfildLogIn = (state:IUser, action: PayloadAction<{token:string}>) => {
  handleFulfild(state);
  state.token=action.payload.token;
};

const handleFulfilledLogout = (state:IUser) => {
  handleFulfild(state);
  state.token = null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, handleFulfildLogIn)
      .addCase(logoutThunk.fulfilled, handleFulfilledLogout)
      .addMatcher(isAnyOf(loginThunk.pending, logoutThunk.pending),handlePending)
      .addMatcher(isAnyOf(loginThunk.rejected, logoutThunk.rejected), handleRejected);
  },
});
