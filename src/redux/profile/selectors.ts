import { RootState } from 'redux/store';

export const getMyActiveAds = (state: RootState) => state.profile.myActiveAds;
export const getMyPendingAds = (state: RootState) => state.profile.myPendingAds;
export const getMyInactiveAds = (state: RootState) =>
  state.profile.myInactiveAds;
export const getMyDeletedAds = (state: RootState) => state.profile.myDeletedAds;
export const isLoading = (state: RootState) => state.profile.isLoading;
export const getAdsCount = (state: RootState) => state.profile.count
export const getSubscriptions = (state: RootState) => state.profile.mySubscriptions;
export const getSubscrCarList = (state: RootState) => state.profile.carListBySubscription;
