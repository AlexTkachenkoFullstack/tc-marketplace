import { useSelector } from "react-redux";
import {
  getAdsCount,
  getMyActiveAds,
  getMyDeletedAds,
  getMyInactiveAds,
  getMyPendingAds,
  isLoadingProfileInfo,
} from 'redux/profile/selectors';

export const useProfile = () => {
  const myActiveAds = useSelector(getMyActiveAds);
  const myPendingAds = useSelector(getMyPendingAds);
  const myInactiveAds = useSelector(getMyInactiveAds);
  const myDeletedAds = useSelector(getMyDeletedAds);
  const adsCount = useSelector(getAdsCount);
  const isAdsLoading = useSelector(isLoadingProfileInfo);

  return {
    myActiveAds,
    myPendingAds,
    myInactiveAds,
    myDeletedAds,
    isAdsLoading,
    adsCount,
  };
};
