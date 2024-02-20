import { Dropdown } from 'components/Dropdown/Dropdown';
import styles from './SearchingResultsMenu.module.scss';
import { useEffect, useState } from 'react';
import { fetchFiltredCars } from 'redux/filter/operations';
import { useSelector } from 'react-redux';
import { getSelectedCars } from 'redux/filter/selectors';
import { ISearchParams } from 'types/ISearchParam';
import { useAppDispatch } from 'redux/hooks';
import { cleanFiltredStore } from 'redux/filter/slice';

interface Iprops {
  onAdvancedFilter: () => void;
}

const SearchingResultsMenu: React.FC<Iprops> = ({ onAdvancedFilter }) => {
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [orderBy, setOrderBy] = useState('CREATED');
  //   const [sortBy, setSortBy] = useState('ASC');
  const dispatch = useAppDispatch();

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);

  useEffect(() => {
    switch (typeOfSort) {
      case 'Ціна':
        setOrderBy('PRICE');
        break;
      case 'Пробіг':
        setOrderBy('MILEAGE');
        break;
      case 'Створено':
        setOrderBy('CREATED');
        break;
      default:
        break;
    }
  }, [typeOfSort]);

  useEffect(() => {
    const searchConfig = {
      page: 0,
      searchParams: { ...searchParams, orderBy, sortBy: 'ASC' },
    };
    console.log('searchConfig', searchConfig);
    dispatch(cleanFiltredStore());
    dispatch(fetchFiltredCars(searchConfig));
  }, [dispatch, orderBy, searchParams]);

  const handleAdvancedFilter = () => {
    onAdvancedFilter();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <div className={styles.menu}>
        <button
          type="button"
          onClick={handleAdvancedFilter}
          className={styles.filter}
        >
          Розширений фільтр
        </button>
        <Dropdown
          options={['Ціна', 'Пробіг', 'Створено']}
          label="Сортування"
          startValue="Сортування"
          option={typeOfSort}
          setOption={setTypeOfSort}
        />
        {/* <select name="sort" className={styles.sort}>
              <option value="new-first">Спочатку нове</option>
              <option value="popular">Популярне</option>
              <option value="price">Ціна</option>
              <option value="name">?</option>
            </select> */}
      </div>
    </div>
  );
};

export default SearchingResultsMenu;
