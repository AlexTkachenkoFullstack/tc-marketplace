import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { ICar } from 'types/IСar';
import { ICount } from 'types/ICount';

import {
  changeTransportStatus,
  fetchMyActiveAds,
  fetchMyAdsCount,
  fetchMyDeletedAds,
  fetchMyInactiveAds,
  fetchMyPendingAds,
  saveSubscription,
} from './operations';

interface IProfileState {
  myActiveAds: ICar[] | [];
  myPendingAds: ICar[] | [];
  myInactiveAds: ICar[] | [];
  myDeletedAds: ICar[] | [];
  count: ICount[] | [];
  error: unknown;
  isLoading: boolean;
}

const initialState: IProfileState = {
  myActiveAds: [],
  myPendingAds: [],
  myInactiveAds: [],
  myDeletedAds: [],
  count: [],
  error: null,
  isLoading: false,
};

const handleFulfilledGetMyAds = (
  type:
    | keyof Pick<
        IProfileState,
        | 'myActiveAds'
        | 'myPendingAds'
        | 'myInactiveAds'
        | 'myDeletedAds'
        | 'count'
      >
    | 'status'
    | 'subscription',
) => {
  return (
    state: IProfileState,
    action: PayloadAction<ICar[]> | PayloadAction<ICount[]>,
  ) => {
    state.isLoading = false;
    state.error = null;
    if (type === 'count') {
      state[type] = action.payload as ICount[];
    } else if (type === 'status' || type === 'subscription') {
      return;
    } else {
      state[type] = action.payload as ICar[];
    }
  };
};

const handlePending = (state: IProfileState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: IProfileState,
  action: PayloadAction<unknown>,
) => {
  state.isLoading = false;
  if (
    typeof action.payload === 'object' &&
    action.payload &&
    'errorMessage' in action.payload
  ) {
    const {
      errorMessage: { errorMessage },
    } = action.payload as {
      errorMessage: { errorMessage: string };
    };
    state.error = errorMessage;
  } else {
    state.error = 'Something went wrong';
  }
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchMyActiveAds.fulfilled,
        handleFulfilledGetMyAds('myActiveAds'),
      )
      .addCase(
        fetchMyPendingAds.fulfilled,
        handleFulfilledGetMyAds('myPendingAds'),
      )
      .addCase(
        fetchMyInactiveAds.fulfilled,
        handleFulfilledGetMyAds('myInactiveAds'),
      )
      .addCase(
        fetchMyDeletedAds.fulfilled,
        handleFulfilledGetMyAds('myDeletedAds'),
      )
      .addCase(fetchMyAdsCount.fulfilled, handleFulfilledGetMyAds('count'))
      .addCase(
        changeTransportStatus.fulfilled,
        handleFulfilledGetMyAds('status'),
      )
      .addCase(saveSubscription.fulfilled, handleFulfilledGetMyAds('subscription'))
      .addMatcher(
        isAnyOf(
          fetchMyActiveAds.pending,
          fetchMyPendingAds.pending,
          fetchMyInactiveAds.pending,
          fetchMyDeletedAds.pending,
          changeTransportStatus.pending,
          saveSubscription.pending,
        ),
        handlePending,
      )
      .addMatcher(
        isAnyOf(
          fetchMyActiveAds.rejected,
          fetchMyPendingAds.rejected,
          fetchMyInactiveAds.rejected,
          fetchMyDeletedAds.rejected,
          fetchMyAdsCount.rejected,
          changeTransportStatus.rejected,
          saveSubscription.rejected,
        ),
        handleRejected,
      );
  },
});
