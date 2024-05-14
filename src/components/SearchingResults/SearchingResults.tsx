import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import _ from 'lodash.throttle';

import styles from './SearchingResults.module.scss';

import { ICar } from 'types/IСar';
import { ISearchParams } from 'types/ISearchParam';

import { cleanFiltredStore } from 'redux/filter/slice';
import {
  getFiltredCars,
  getIsloadingFilterInfo,
  getTotalAdverts,
  getSelectedCars,
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
  

  const dispatch = useAppDispatch();
  const location = useLocation();

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);
  const adverts = useSelector(getFiltredCars);
  const isLoadingFilteredCars = useSelector(getIsloadingFilterInfo);
  const isLoadingSubscrCars = useSelector(isLoadingProfileInfo);
  const totalAdverts: number | null = useSelector(getTotalAdverts);
  let advertsPerPage = 4;
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

  const setScreenWidthRef = useRef(window.innerWidth);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width !== setScreenWidthRef.current) {
      const newAdvertsPerPage = width > 767 ? 4 : 3;
      setFetchParam(prev => ({ ...prev, limit: newAdvertsPerPage }));
      setScreenWidthRef.current = width;
    }
  }, [setScreenWidthRef]);

  useEffect(() => {
    window.addEventListener('resize', _(handleResize, 100));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setIsShowMore(false);
    setFetchParam({ ...memoParam, page: 0 });
  }, [memoParam]);

  const id = location.state ? location.state.id : 0;
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
    useSelector(getSubscrCarList);
  const subsrcCarsArr = [...unseenTransportList, ...viewedTransportList];

  const arrForRender = id ? subsrcCarsArr : filteredCarsArr;
   const [title, setTitle] = useState<{ [key: string]: string[] }>({});

  const handleTitle = (title: { [key: string]: string[] }) => {
    setTitle(title);
  };

  return (
    <>
      <SearchingResultsMenu
        onAdvancedFilter={handleAdvancedFilter}
        isOpenAdvancedFilter={isOpenAdvancedFilter}
        title={title}
      />

      {isOpenAdvancedFilter && (
        <AdvancedSearchFilter
          onAdvencedFilter={handleAdvancedFilter}
          handleTitle={handleTitle}
        />
      )}

      {!isOpenAdvancedFilter && (
        <div className={styles.container}>
          {(isLoadingFilteredCars || isLoadingSubscrCars) && !isShowMore ? (
            <Loader />
          ) : !isLoadingFilteredCars &&
            isComponentMounted &&
            arrForRender.length === 0 ? (
            "We don't have any adverts"
          ) : (
            <>
              {isLoadingFilteredCars && isShowMore && <Loader />}
              <div className={styles.catalogContainer}>
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
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchingResults;
