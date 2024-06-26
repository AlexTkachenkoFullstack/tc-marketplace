import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './SearchingResultsMenu.module.scss';

import { changeFiltredParams } from 'redux/filter/slice';
import { Dropdown } from 'components/Dropdown/Dropdown';

import SubscriptionModal from 'components/SubscriptionModal';
import { createPortal } from 'react-dom';
import {
  getParamsForSuscr,
  // getSelectedCars,
  getTotalAdverts,
} from 'redux/filter/selectors';
import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/arrow_back.svg';
import { fullTitle } from 'hooks/titleCreator';
// import { getCarTypeParam } from 'services/services';

const portal = document.querySelector('#modal-root') as Element;

interface Iprops {
  onAdvancedFilter?: () => void;
  isOpenAdvancedFilter?: boolean;
  title: { [key: string]: string[] };
}

const SearchingResultsMenu: React.FC<Iprops> = ({
  onAdvancedFilter,
  isOpenAdvancedFilter,
  title,
}) => {
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [orderBy, setOrderBy] = useState<'CREATED' | 'PRICE' | 'MILEAGE'>(
    'CREATED',
  );
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [data, setData] = useState<any>({});

  const dispatch = useAppDispatch();
  const requestParams = useAppSelector(getParamsForSuscr);

  const selectedCategory = requestParams.selectedCategory;
  // const selectedCategory = useAppSelector(getParamsForSuscr);
  // const { transportTypeId } = useAppSelector(getSelectedCars);

  // useEffect(() => {
  //   if (!transportTypeId) {
  //     return;
  //   }
  //   async function getCarTypeParams() {
  //     if (transportTypeId !== null) {
  //       const data = await getCarTypeParam(transportTypeId);
  //       setData(data);
  //     }
  //   }
  //   getCarTypeParams();
  // }, [transportTypeId]);

  // useEffect(() => {
  //   dispatch(
  //     saveParamsForSubscr({
  //       selectedCategory: "Легкові",
  //       data,
  //     }),
  //   );
  // }, [data, dispatch]);

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

  const titleCategory = useAppSelector(getParamsForSuscr).selectedCategory;
  const totalAdverts = useAppSelector(getTotalAdverts);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleWraper}>
          {isOpenAdvancedFilter && (
            <button
              type="button"
              onClick={handleAdvancedFilter}
              className={styles.filter_arrow_back}
            >
              <BackIcon />
            </button>
          )}
          <h1 className={styles.title}>
            {isOpenAdvancedFilter
              ? 'Розширений пошук'
              : fullTitle(titleCategory, totalAdverts, title)}
          </h1>
        </div>
        {!isOpenAdvancedFilter && (
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
              <span className={styles.hiddenText}>Розширений&nbsp;</span> фільтр
            </button>

            <>
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
                  // hideLabel={true}
                />
              </div>

              <button
                className={`${styles.subscr} ${
                  selectedCategory ? '' : styles.hideSubscrBtn
                }`}
                type="button"
                onClick={toggleModalIsOpen}
                // disabled={selectedCategory ? false : true}
              >
                <StarIcon />
                <span className={styles.hiddenText}>Підписатись на пошук</span>
              </button>
            </>
            {/* )} */}
          </div>
        )}
        {isModalOpen &&
          createPortal(
            <SubscriptionModal
              toggleModalIsOpen={toggleModalIsOpen}
              requestParams={requestParams}
            />,
            portal,
          )}
      </div>
    </section>
  );
};

export default SearchingResultsMenu;
