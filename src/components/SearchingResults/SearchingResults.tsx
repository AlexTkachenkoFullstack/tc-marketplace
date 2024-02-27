import React, { useEffect, useMemo, useState } from 'react';
import styles from './SearchingResults.module.scss';
import { useSelector } from 'react-redux';
import {
  getFiltredCars,
  getIsloadingFiltredCars,
} from 'redux/filter/selectors';
import { SearchingCard } from './SearchingCard/SearchingCard';
import { ISearchParams } from 'types/ISearchParam';
import { fetchFiltredCars } from 'redux/filter/operations';
import { getSelectedCars } from 'redux/filter/selectors';
import { useAppDispatch } from 'redux/hooks';
import {
  cleanFiltredStore,
  updateFilteredStoreAfterHide,
} from 'redux/filter/slice';
import CatalogPagination from './CatalogPagination/CatalogPagination';
import Loader from 'components/Loader/Loader';

const SearchingResults: React.FC = () => {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const adverts = useSelector(getFiltredCars);
  const isLoading = useSelector(getIsloadingFiltredCars);

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);

  const memoParam = useMemo(() => {
    return {
      page: 0,
      searchParams: { ...searchParams },
    };
  }, [searchParams]);

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

  useEffect(() => {
    dispatch(cleanFiltredStore());
    if (isComponentMounted) {
      dispatch(fetchFiltredCars(memoParam));
    } else {
      setIsComponentMounted(true);
    }
  }, [dispatch, memoParam, isComponentMounted]);

  const updateAfterHide = (carId: number) => {
    const updatedArr = adverts.filter(({ id }) => id !== carId);
    dispatch(updateFilteredStoreAfterHide(updatedArr));
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.catalogContainer}>
          {adverts.map(advert => (
            <SearchingCard
              key={advert.id}
              car={advert}
              onShowMenu={handleOptionMenu}
              onInfoContainerClick={handleInfoContainerClick}
              onUpdateAfterHide={updateAfterHide}
              isShowMenu={optionMenuId === advert.id}
            />
          ))}
        </div>
      )}
      <CatalogPagination />
    </div>
  );
};

export default SearchingResults;
