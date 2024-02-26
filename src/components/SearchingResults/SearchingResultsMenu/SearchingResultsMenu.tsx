import { Dropdown } from 'components/Dropdown/Dropdown';
import styles from './SearchingResultsMenu.module.scss';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeFiltredParams } from 'redux/filter/slice';
import { getSelectedCars } from 'redux/filter/selectors';

interface Iprops {
  onAdvancedFilter: () => void;
}

const SearchingResultsMenu: React.FC<Iprops> = ({ onAdvancedFilter }) => {
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [orderBy, setOrderBy] = useState<'CREATED' | 'PRICE' | 'MILEAGE'>(
    'CREATED',
  );
  //   const [sortBy, setSortBy] = useState('ASC');
  const dispatch = useAppDispatch();

  const { transportTypeId } = useAppSelector(getSelectedCars);
  let filterType;
  switch (transportTypeId) {
    case 1:
      filterType = 'Легкові';
      break;
    case 2:
      filterType = 'Мото';
      break;
    case 3:
      filterType = 'Вантажівки';
      break;
    case 4:
      filterType = 'Спецтехніка';
      break;
    case 5:
      filterType = 'Сільгосптехніка';
      break;
    case 6:
      filterType = 'Водний транспорт';
      break;

    default:
      break;
  }

  useEffect(() => {
    switch (typeOfSort) {
      case 'Від дешевих до дорогих':
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
    dispatch(changeFiltredParams({ orderBy, sortBy: 'ASC' }));
  }, [dispatch, orderBy]);

  const handleAdvancedFilter = () => {
    onAdvancedFilter();
  };
// const menuStyle = 'menuStyle';
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результати пошуку: "{filterType}"</h1>
      <div className={styles.menu}>
        <button
          type="button"
          onClick={handleAdvancedFilter}
          className={styles.filter}
        >
          Розширений фільтр
        </button>
        <div className={styles.dropdownMenu}>
          <Dropdown
            options={[
              'Від дешевих до дорогих',
              'Від дорогих до дешевих',
              'Пробіг, за зростанням',
              'Пробіг, за спаданням',
              'Від нових до старих',
              'Від старих до нових',
            ]}
            label="Сортування"
            startValue="Сортування"
            option={typeOfSort}
            setOption={setTypeOfSort}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchingResultsMenu;
