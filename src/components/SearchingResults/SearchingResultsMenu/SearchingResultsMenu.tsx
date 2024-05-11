import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './SearchingResultsMenu.module.scss';

import { changeFiltredParams } from 'redux/filter/slice';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useSearchTitleCreator } from 'hooks/useSearchTitleCreator';
import SubscriptionModal from 'components/SubscriptionModal';
import { createPortal } from 'react-dom';
import { getParamsForSuscr } from 'redux/filter/selectors';
import { ReactComponent as EyeCloseIcon } from '../../../assets/icons/star.svg';

const portal = document.querySelector('#modal-root') as Element;

interface Iprops {
  onAdvancedFilter?: () => void;
  isOpenAdvancedFilter?: boolean;
}

const SearchingResultsMenu: React.FC<Iprops> = ({
  onAdvancedFilter,
  isOpenAdvancedFilter,
}) => {
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [orderBy, setOrderBy] = useState<'CREATED' | 'PRICE' | 'MILEAGE'>(
    'CREATED',
  );
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = useSearchTitleCreator();
  const dispatch = useAppDispatch();
  const requestParams = useAppSelector(getParamsForSuscr);

  const toggleModalIsOpen = () => {
    setIsModalOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = screenWidth < 768;

  useEffect(() => {
    switch (typeOfSort) {
      case 'Від дешевих до дорогих':
        setOrderBy('PRICE');
        setSortBy('ASC');
        break;
      case 'Від дорогих до дешевих':
        setOrderBy('PRICE');
        setSortBy('DESC');
        break;
      case 'Пробіг, за зростанням':
        setOrderBy('MILEAGE');
        setSortBy('ASC');
        break;
      case 'Пробіг, за спаданням':
        setOrderBy('MILEAGE');
        setSortBy('DESC');
        break;
      case 'Від нових до старих':
        setOrderBy('CREATED');
        setSortBy('ASC');
        break;
      case 'Від старих до нових':
        setOrderBy('CREATED');
        setSortBy('DESC');
        break;
      default:
        break;
    }
  }, [typeOfSort]);

  useEffect(() => {
    dispatch(changeFiltredParams({ orderBy, sortBy }));
  }, [dispatch, orderBy, sortBy]);

  const handleAdvancedFilter = () => {
    onAdvancedFilter?.();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isOpenAdvancedFilter ? 'Розширений пошук' : `Пошук: "${title}"`}
      </h1>
      <div
        className={styles.menu}
        style={{
          justifyContent: isOpenAdvancedFilter && isMobile ? 'unset' : '',
        }}
      >
        <button
          type="button"
          onClick={handleAdvancedFilter}
          className={styles.filter}
        >
          <span className={styles.advFilter}>Розширений</span> фільтр
        </button>
        <div className={styles.dropdownMenu}>
          <Dropdown
            updateStyle="menuStyle"
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
        <button
          className={styles.filter}
          type="button"
          onClick={toggleModalIsOpen}
        >
          <EyeCloseIcon />
          Підписатись на пошук
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <SubscriptionModal
            toggleModalIsOpen={toggleModalIsOpen}
            requestParams={requestParams}
          />,
          portal,
        )}
    </div>
  );
};

export default SearchingResultsMenu;
