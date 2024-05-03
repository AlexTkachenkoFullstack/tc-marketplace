import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './AdvancedSearch.module.scss';
import SearchingResults from 'components/SearchingResults/SearchingResults';
// import { useAppDispatch } from 'redux/hooks';
// import { cleanFiltredStore } from 'redux/filter/slice';

export const AdvancedSearch: React.FC = () => {
  const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);
  // const dispatch = useAppDispatch();

  const handleAdvancedFilter = () => {
    setIsOpenAdvancedFilter(prev => !prev);
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    setIsOpenAdvancedFilter(
      searchParams.get('isOpenAdvancedFilter') === 'true',
    );
  }, [searchParams]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(cleanFiltredStore({ field: 'all' }));
  //   };
  // }, [dispatch]);

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
