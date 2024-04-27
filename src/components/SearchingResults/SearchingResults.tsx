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

import {
  cleanFiltredStore,
  // updateFilteredStoreAfterHide,
} from 'redux/filter/slice';
import {
  getFiltredCars,
  getIsloadingFiltredCars,
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
import { getSubscrCarList } from 'redux/profile/selectors';
import { AdvancedSearchFilter } from 'components/AdvancedSearchFilter/AdvancedSearchFilter';

interface IProps {
  handleAdvancedFilter: () => void;
  isOpenAdvancedFilter: boolean;
}

const SearchingResults: React.FC<IProps> = ({
  handleAdvancedFilter,
  isOpenAdvancedFilter,
}) => {
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const [arrForRender, setArrForRender] = useState<ICar[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  const dispatch = useAppDispatch();

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);
  const adverts = useSelector(getFiltredCars);
  const isLoading = useSelector(getIsloadingFiltredCars);
  const totalAdverts: number | null = useSelector(getTotalAdverts);
  let advertsPerPage = 4;
  let totalPages: number;
  if (totalAdverts !== null) {
    totalPages = Math.ceil(totalAdverts / advertsPerPage);
  } else {
    totalPages = 1;
  }

  const filteredFetchParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0;
          } else {
            console.log('string');
            if (key.includes('price') && (value === 100 || value === 1000000)) {
              console.log(key.includes('price'));
              return false;
            } else if (
              key.includes('year') &&
              (value === 1970 || value === 2024)
            ) {
              return false;
            } else if (key.includes('mileage') && value === 1000000) {
              return false;
            } else if (key.includes('engineDisplacement') && value === 20) {
              return false;
            } else if (key.includes('enginePower') && value === 1000) {
              return false;
            } else if (
              key.includes('numberOfDoors') &&
              (value === 2 || value === 5)
            ) {
              return false;
            } else if (
              key.includes('numberOfSeats') &&
              (value === 2 || value === 18)
            ) {
              return false;
            }
            return value !== undefined && value !== 0;
          }
        }),
      ),
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

  useEffect(() => {
    if (isComponentMounted) {
      dispatch(fetchFiltredCars(fetchParam));
    } else {
      setIsComponentMounted(true);
    }
  }, [dispatch, fetchParam, isComponentMounted]);

  useEffect(() => {
    if (!isShowMore) {
      setArrForRender(adverts);
    } else {
      setArrForRender(prevState => [...prevState, ...adverts]);
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
    // const updatedArr = arrForRender.filter(({ id }) => id !== carId);
    // dispatch(updateFilteredStoreAfterHide(updatedArr));
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

  // useEffect(() => {
  //   // Формируем базовый URL
  //   let baseUrl = `/api.pawo.space/api/v1/catalog/search/page/${fetchParam.page}/limit/${memoParam.limit}/`;

  //   // Создаем объект с параметрами
  //   const queryParams: Record<string, string> = {};
  //   Object.entries(memoParam.searchParams).forEach(([key, value]) => {
  //     queryParams[key] = String(value);
  //   });

  //   // Преобразуем объект с параметрами в строку запроса
  //   const queryString = new URLSearchParams(queryParams).toString();

  //   // Формируем конечный URL
  //   const finalUrl =
  //     baseUrl + (queryString.length > 0 ? `?${queryString}` : '');

  //   // Заменяем URL в истории
  //   window.history.replaceState(null, '', finalUrl);
  // }, [memoParam, fetchParam.page]);
  const location = useLocation();
  const [subscrId, setSubscrId] = useState(null);
  const { unseenTransportList, viewedTransportList } =
    useSelector(getSubscrCarList);
  const subsrcCarArr = [...unseenTransportList, ...viewedTransportList];
  // console.log('location.state', subsrcCarArr);
  useEffect(() => {
    if (location.state) {
      const {
        state: { id },
      } = location;
      id && setSubscrId(id);
    }
  }, [location]);

  useEffect(() => {
    subscrId && dispatch(fetchCarsBySubscription(subscrId));
  }, [dispatch, subscrId]);

  const arr = subsrcCarArr.length > 0 ? subsrcCarArr : arrForRender;

  return (
    <>
      <SearchingResultsMenu
        onAdvancedFilter={handleAdvancedFilter}
        isOpenAdvancedFilter={isOpenAdvancedFilter}
      />

      {isOpenAdvancedFilter && (
        <AdvancedSearchFilter
          onAdvencedFilter={handleAdvancedFilter}
          // toggleModalIsOpen={toggleModalIsOpen}
        />
      )}
      <div className={styles.container}>
        {isLoading && !isShowMore ? (
          <Loader />
        ) : !isLoading && isComponentMounted && arrForRender.length === 0 ? (
          "We don't have any adverts"
        ) : (
          <>
            {isLoading && isShowMore && <Loader />}
            <div className={styles.catalogContainer}>
              {arr.map((advert, index) => (
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
    </>
  );
};

export default SearchingResults;
