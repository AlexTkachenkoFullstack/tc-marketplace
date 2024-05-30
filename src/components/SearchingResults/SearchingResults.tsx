import React, {
  // useCallback,
  useEffect,
  useMemo,
  // useRef,
  useState,
} from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
// import _ from 'lodash.throttle';

import styles from './SearchingResults.module.scss';

import { ICar } from 'types/IСar';
import { ISearchParams } from 'types/ISearchParam';

import { cleanFiltredStore } from 'redux/filter/slice';
import {
  getFiltredCars,
  getIsloadingFilterInfo,
  getTotalAdverts,
  getSelectedCars,
  getTitle,
} from 'redux/filter/selectors';
import { fetchFiltredCars } from 'redux/filter/operations';

import Loader from 'components/Loader/Loader';
import SearchingCard from './SearchingCard';
import CatalogPagination from './CatalogPagination';
import SearchingResultsMenu from './SearchingResultsMenu';
import { useLocation } from 'react-router-dom';
import { fetchCarsBySubscription } from 'redux/profile/operations';
import {
  getSubscrCarList,
  isLoadingProfileInfo,
} from 'redux/profile/selectors';
import { AdvancedSearchFilter } from 'components/AdvancedSearchFilter/AdvancedSearchFilter';
import { paramsOptimization } from 'utils/paramsOptimization';
import {ReactComponent as DoveIcon} from "../../assets/icons/dove.svg"

interface IProps {
  handleAdvancedFilter: () => void;
  isOpenAdvancedFilter: boolean;
}

const SearchingResults: React.FC<IProps> = ({
  handleAdvancedFilter,
  isOpenAdvancedFilter,
}) => {
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const [filteredCarsArr, setFilteredCarsArr] = useState<ICar[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState<number>(2);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const title = useAppSelector(getTitle);

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useAppSelector(getSelectedCars);
  const adverts = useAppSelector(getFiltredCars);
  const isLoadingFilteredCars = useAppSelector(getIsloadingFilterInfo);
  const isLoadingSubscrCars = useAppSelector(isLoadingProfileInfo);
  const totalAdverts: number | null = useAppSelector(getTotalAdverts);
  let advertsPerPage = 12;
  let totalPages: number;
  if (totalAdverts !== null) {
    totalPages = Math.ceil(totalAdverts / advertsPerPage);
  } else {
    totalPages = 1;
  }

  const filteredFetchParams = useMemo(
    () => paramsOptimization(searchParams),
    [searchParams],
  );
  const hasValidValues = Object.keys(filteredFetchParams).length > 0;
  const searchParamsValue = useMemo(
    () => (hasValidValues ? filteredFetchParams : {}),
    [filteredFetchParams, hasValidValues],
  );

  const memoParam = useMemo(() => {
    return {
      page: 0,
      limit: advertsPerPage,
      searchParams: { ...searchParamsValue },
    };
  }, [searchParamsValue, advertsPerPage]);

  const [fetchParam, setFetchParam] = useState({ ...memoParam });

  // const setScreenWidthRef = useRef(window.innerWidth);

  // const handleResize = useCallback(() => {
  //   const width = window.innerWidth;
  //   if (width !== setScreenWidthRef.current) {
  //     const newAdvertsPerPage = width > 767 ? 4 : 3;
  //     setFetchParam(prev => ({ ...prev, limit: newAdvertsPerPage }));
  //     const range = width > 767 ? 5 : 2;
  //     setPageRangeDisplayed(range);
  //     setScreenWidthRef.current = width;
  //   }
  // }, [setScreenWidthRef]);

  // useEffect(() => {
  //   window.addEventListener('resize', _(handleResize, 100));
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [handleResize]);

  useEffect(() => {
    setIsShowMore(false);
    setFetchParam({ ...memoParam, page: 0 });
  }, [memoParam]);

  useEffect(() => {
    const width = window.innerWidth;
    setPageRangeDisplayed(width > 768 ? 5 : 2);
  }, []);

  const id = location.state ? location.state.id : 0;
  // const titleFromHomePage = location.state && location.state.titleFromHomePage;
  // console.log('titleFromHomePage', titleFromHomePage);

  // useEffect(() => {
  //   if (!isComponentMounted) {
  //     titleFromHomePage && setTitle(titleFromHomePage);
  //   }
  //   setIsComponentMounted(true);
  // }, [isComponentMounted, titleFromHomePage]);

  useEffect(() => {
    if (isComponentMounted) {
      !id && dispatch(fetchFiltredCars(fetchParam));
      id && dispatch(fetchCarsBySubscription(id));
    } else {
      setIsComponentMounted(true);
    }
  }, [dispatch, fetchParam, isComponentMounted, id]);

  useEffect(() => {
    if (!isShowMore) {
      setFilteredCarsArr(adverts);
    } else {
      setFilteredCarsArr(prevState => [...prevState, ...adverts]);
    }
    setIsInitialLoadComplete(true);
  }, [adverts, isShowMore]);

  const handleOptionMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    cardId: number,
  ) => {
    event.stopPropagation();
    if (!optionMenuId) {
      setOptionMenuId(cardId);
    } else {
      setOptionMenuId(optionMenuId === cardId ? null : cardId);
    }
  };

  const handleInfoContainerClick = () => {
    setOptionMenuId(null);
  };

  const updateAfterHide = () => {
    dispatch(fetchFiltredCars(fetchParam));
  };

  const updateAfterAllHide = () => {
    setIsShowMore(false);
    dispatch(fetchFiltredCars(fetchParam));
  };

  const handleShowMore = () => {
    setIsShowMore(true);
    dispatch(cleanFiltredStore({ field: 'filtredCars' }));
    setFetchParam(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    setIsShowMore(false);
    setFetchParam(prev => ({ ...prev, page: selected }));
  };

  const { unseenTransportList, viewedTransportList } =
    useAppSelector(getSubscrCarList);
  const subsrcCarsArr = [...unseenTransportList, ...viewedTransportList];

  const arrForRender = id ? subsrcCarsArr : filteredCarsArr;

  return (
    <>
      <SearchingResultsMenu
        onAdvancedFilter={handleAdvancedFilter}
        isOpenAdvancedFilter={isOpenAdvancedFilter}
        title={title}
      />

      {isOpenAdvancedFilter && (
        <AdvancedSearchFilter onAdvencedFilter={handleAdvancedFilter} />
      )}

      {!isOpenAdvancedFilter && (
        <section className={styles.section}>
          {(isLoadingFilteredCars || isLoadingSubscrCars) && !isShowMore ? (
            <Loader />
          ) : !isLoadingFilteredCars &&
            isInitialLoadComplete &&
            arrForRender.length === 0 ? (
            <div className={styles.messageThumb}>
              <DoveIcon />
              <p>Немає оголошень, що задовольняють вашому запиту</p>
            </div>
          ) : (
            <>
              {isLoadingFilteredCars && isShowMore && <Loader />}
              <div className={styles.container}>
                {arrForRender.map(advert => (
                  <SearchingCard
                    key={advert.id}
                    car={advert}
                    onShowMenu={handleOptionMenu}
                    onInfoContainerClick={handleInfoContainerClick}
                    onUpdateAfterHide={updateAfterHide}
                    isShowMenu={optionMenuId === advert.id}
                    updateAfterAllHide={updateAfterAllHide}
                  />
                ))}
              </div>
              <CatalogPagination
                forcePage={fetchParam.page}
                onSetPage={handleShowMore}
                currentPage={fetchParam.page}
                totalPages={totalPages}
                handlePageClick={handleChangePage}
                pageRangeDisplayed={pageRangeDisplayed}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default SearchingResults;
