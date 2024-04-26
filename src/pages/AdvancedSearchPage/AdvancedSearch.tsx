import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AdvancedSearch.module.scss';
import SearchingResults from 'components/SearchingResults/SearchingResults';
import { useAppDispatch } from 'redux/hooks';
import { cleanFiltredStore } from 'redux/filter/slice';
// import { AdvancedSearchFilter } from 'components/AdvancedSearchFilter/AdvancedSearchFilter';

// import { SearchTop } from '../../components/SearchTop/SearchTop';
// import AdvSearchBottom from './AdvSearchBottom/AdvSearchBottom';
// import SearchingResultsMenu from 'components/SearchingResults/SearchingResultsMenu/SearchingResultsMenu';

export const AdvancedSearch: React.FC = () => {
  const location = useLocation();
  const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);
  const dispatch = useAppDispatch();

  const handleAdvancedFilter = () => {
    setIsOpenAdvancedFilter(prev => !prev);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsOpenAdvancedFilter(
      searchParams.get('isOpenAdvancedFilter') === 'true',
    );
  }, [location.search]);

  useEffect(() => {
    return () => {
      dispatch(cleanFiltredStore({ field: 'all' }));
    };
  }, [dispatch]);

  return (
    <section className={styles.AdvSearch}>
      <div className={styles.AdvSearch_container}>
        <SearchingResults
          handleAdvancedFilter={handleAdvancedFilter}
          isOpenAdvancedFilter={isOpenAdvancedFilter}
        />
      </div>
    </section>
  );
};
