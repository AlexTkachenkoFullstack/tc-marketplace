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
  fetchSubscriptions,
  deleteSubscription,
  editSubscription,
  fetchCarsBySubscription,
  changeUserPassword,
} from './operations';
import { ISubscription } from 'types/ISubscription';

interface IProfileState {
  myActiveAds: ICar[] | [];
  myPendingAds: ICar[] | [];
  myInactiveAds: ICar[] | [];
  myDeletedAds: ICar[] | [];
  mySubscriptions: ISubscription[] | [];
  carListBySubscription:
    | { unseenTransportList: ICar[]; viewedTransportList: ICar[] }
    | { unseenTransportList: []; viewedTransportList: [] };
  count: ICount[] | [];
  error: unknown;
  isLoading: boolean;
}

const initialState: IProfileState = {
  myActiveAds: [],
  myPendingAds: [],
  myInactiveAds: [],
  myDeletedAds: [],
  mySubscriptions: [],
  carListBySubscription: { unseenTransportList: [], viewedTransportList: [] },
  count: [],
  error: null,
  isLoading: false,
};

const handleFulfilledGetMyAdsAndSubscriptions = (
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
    | 'saveSubscription'
    | 'mySubscriptions'
    | 'deleteSubscription'
    | 'editSubscription'
    | 'carListBySubscription'
    | 'changeUserPassword',
) => {
  return (
    state: IProfileState,
    action:
      | PayloadAction<ICar[]>
      | PayloadAction<ICount[]>
      | PayloadAction<ISubscription[]>
      | PayloadAction<{
          unseenTransportList: ICar[];
          viewedTransportList: ICar[];
        }>,
  ) => {
    state.isLoading = false;
    state.error = null;
    if (type === 'count') {
      state[type] = action.payload as ICount[];
    } else if (
      type === 'status' ||
      type === 'saveSubscription' ||
      type === 'deleteSubscription' ||
      type === 'editSubscription' ||
      type === 'changeUserPassword'
    ) {
      return;
    } else if (type === 'mySubscriptions') {
      state[type] = action.payload as ISubscription[];
    } else if (type === 'carListBySubscription') {
      state[type] = action.payload as {
        unseenTransportList: ICar[];
        viewedTransportList: ICar[];
      };
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
  reducers: {
    deleteSubscrInState(state, { payload }) {
      state.mySubscriptions = state.mySubscriptions.filter(
        ({ id }) => id !== payload,
      );
    },
    cleanSubscrCarList(state) {
      state.carListBySubscription = {
        unseenTransportList: [],
        viewedTransportList: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchMyActiveAds.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('myActiveAds'),
      )
      .addCase(
        fetchMyPendingAds.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('myPendingAds'),
      )
      .addCase(
        fetchMyInactiveAds.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('myInactiveAds'),
      )
      .addCase(
        fetchMyDeletedAds.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('myDeletedAds'),
      )
      .addCase(
        fetchMyAdsCount.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('count'),
      )
      .addCase(
        changeTransportStatus.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('status'),
      )
      .addCase(
        saveSubscription.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('saveSubscription'),
      )
      .addCase(
        fetchSubscriptions.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('mySubscriptions'),
      )
      .addCase(
        deleteSubscription.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('deleteSubscription'),
      )
      .addCase(
        editSubscription.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('editSubscription'),
      )
      .addCase(
        fetchCarsBySubscription.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('carListBySubscription'),
      )
      .addCase(
        changeUserPassword.fulfilled,
        handleFulfilledGetMyAdsAndSubscriptions('changeUserPassword'),
      )
      .addMatcher(
        isAnyOf(
          fetchMyActiveAds.pending,
          fetchMyPendingAds.pending,
          fetchMyInactiveAds.pending,
          fetchMyDeletedAds.pending,
          changeTransportStatus.pending,
          saveSubscription.pending,
          fetchSubscriptions.pending,
          deleteSubscription.pending,
          editSubscription.pending,
          fetchCarsBySubscription.pending,
          changeUserPassword.pending,
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
          fetchSubscriptions.rejected,
          deleteSubscription.rejected,
          editSubscription.rejected,
          fetchCarsBySubscription.rejected,
          changeUserPassword.rejected,
        ),
        handleRejected,
      );
  },
});

export const { deleteSubscrInState, cleanSubscrCarList } = profileSlice.actions;
