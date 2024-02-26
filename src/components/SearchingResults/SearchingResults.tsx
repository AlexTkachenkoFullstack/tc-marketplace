// import { CardItem } from "components/CardItem";
import React, { useEffect, useMemo, useState } from 'react';
import styles from './SearchingResults.module.scss';

import { useSelector } from 'react-redux';
import { getFiltredCars } from 'redux/filter/selectors';

// import { ICar } from "types/IСar";
import { SearchingCard } from './SearchingCard/SearchingCard';
import { ISearchParams } from 'types/ISearchParam';
import { fetchFiltredCars } from 'redux/filter/operations';
import { getSelectedCars } from 'redux/filter/selectors';
import { useAppDispatch } from 'redux/hooks';
import { cleanFiltredStore } from 'redux/filter/slice';
import CatalogPagination from './CatalogPagination/CatalogPagination';

// interface Props {
//     cars?: ICar[] | [];
// }

const SearchingResults: React.FC = () => {
  const [componentMounted, setComponentMounted] = useState(false);
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const adverts = useSelector(getFiltredCars);

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);

  const memoParam = useMemo(() => {
    return {
    page: 0,
    searchParams: { ...searchParams },
  };}, [searchParams]);

  // const searchConfig = {
  //   page: 0,
  //   searchParams: { ...searchParams },
  // };

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
    if (componentMounted) {
      dispatch(fetchFiltredCars(memoParam));
    } else {
      setComponentMounted(true);
    }
  }, [dispatch, memoParam, componentMounted]);

  const updateAfterHide = () => {
    dispatch(cleanFiltredStore());
    dispatch(fetchFiltredCars(memoParam));
  };

  return (
    <div className={styles.container}>
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

      <CatalogPagination />
    </div>
  );
};

export default SearchingResults;
