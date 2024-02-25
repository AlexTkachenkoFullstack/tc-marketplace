import React, { useState } from 'react';
import styles from './AdvancedSearch.module.scss';
// import { SearchTop } from '../../components/SearchTop/SearchTop';
// import AdvSearchBottom from './AdvSearchBottom/AdvSearchBottom';
import SearchingResults from 'components/SearchingResults/SearchingResults';
import SearchingResultsMenu from 'components/SearchingResults/SearchingResultsMenu/SearchingResultsMenu';
import { AdvancedSearchFilter } from 'components/AdvancedSearchFilter/AdvancedSearchFilter';

export const AdvancedSearch: React.FC = () => {
  const [isAdvancedFilter, setIisAdvancedFilter] = useState(false);

  const handleAdvancedFilter = () => {
    setIisAdvancedFilter(prev => !prev);
  };

  return (
    <section className={styles.AdvSearch}>
      <div className={styles.AdvSearch_container}>
        <SearchingResultsMenu onAdvancedFilter={handleAdvancedFilter} />
        {isAdvancedFilter && <AdvancedSearchFilter />}
        <SearchingResults />
      </div>
    </section>
  );
};
