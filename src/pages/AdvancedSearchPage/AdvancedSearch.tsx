import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchingResults from 'components/SearchingResults/SearchingResults';

export const AdvancedSearch: React.FC = () => {
  const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);

  const handleAdvancedFilter = () => {
    setIsOpenAdvancedFilter(prev => !prev);
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    setIsOpenAdvancedFilter(
      searchParams.get('isOpenAdvancedFilter') === 'true',
    );
  }, [searchParams]);

  return (
    <>
      <SearchingResults
        handleAdvancedFilter={handleAdvancedFilter}
        isOpenAdvancedFilter={isOpenAdvancedFilter}
      />
    </>
  );
};
