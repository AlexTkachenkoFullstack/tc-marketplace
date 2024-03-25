import { useSelector } from "react-redux";
import { getAdsCount, getMyActiveAds, getMyDeletedAds, getMyInactiveAds, getMyPendingAds, isLoading } from "redux/profile/selectors";

export const useProfile = () => {
  const myActiveAds = useSelector(getMyActiveAds);
  const myPendingAds = useSelector(getMyPendingAds);
  const myInactiveAds = useSelector(getMyInactiveAds);
  const myDeletedAds = useSelector(getMyDeletedAds);
  const adsCount = useSelector(getAdsCount);
  const isAdsLoading = useSelector(isLoading);

  return {
    myActiveAds,
    myPendingAds,
    myInactiveAds,
    myDeletedAds,
    isAdsLoading,
    adsCount,
  };
};
