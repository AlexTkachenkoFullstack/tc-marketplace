import { FC, useEffect, useState } from 'react';
import styles from './FavoritesPage.module.scss';
import { getFavoritesCars } from 'services/services';
import SearchingCard from 'components/SearchingResults/SearchingCard';
import CatalogPagination from 'components/SearchingResults/CatalogPagination';
import Loader from 'components/Loader/Loader';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { ReactComponent as Back } from '../../assets/icons/arrow_back.svg';
import { useNavigate } from 'react-router-dom';
export const FavoritesPage: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const totalAdverts = responseData.length;
  const advertsPerPage = 4;
  const totalPages =
    totalAdverts !== null ? Math.ceil(totalAdverts / advertsPerPage) : 1;
  const [paginations, setPaginations] = useState({ page: 0 });

  useEffect(() => {
    async function fetchFavoritesCars() {
      setIsLoading(true);
      try {
        const response = await getFavoritesCars();
        setResponseData(response);
        setIsLoading(false);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    fetchFavoritesCars();
  }, []);

  const handleOptionMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    cardId: number,
  ) => {
    event.stopPropagation();
    // Your logic for handling option menu
  };

  const handleInfoContainerClick = () => {
    // Your logic for handling info container click
  };

  const updateAfterHide = () => {
    // Your logic for updating after hiding
  };

  const updateAfterAllHide = () => {
    // Your logic for updating after hiding all
  };

  const handleCancelFavorite = (id: number) => {
    const newVal = responseData.filter((item: any) => id !== item.id);
    setResponseData(newVal);
  };

  const handleShowMore = () => {
    const newStart = 0;
    const newEnd = end + advertsPerPage;
    setStart(newStart);
    setEnd(newEnd);
    setPaginations(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    const newStart = selected * advertsPerPage;
    const newEnd = newStart + advertsPerPage;
    setStart(newStart);
    setEnd(newEnd);
    setPaginations(prev => ({ ...prev, page: selected }));
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  let sortedArray = [...responseData]; // Copy the responseData array

  switch (typeOfSort) {
    case 'Від дешевих до дорогих':
      sortedArray = sortedArray.sort((a, b) => a.price - b.price);
      break;
    case 'Від дорогих до дешевих':
      sortedArray = sortedArray.sort((a, b) => b.price - a.price);
      break;
    case 'Пробіг, за зростанням':
      sortedArray = sortedArray.sort((a, b) => a.mileage - b.mileage);
      break;
    case 'Пробіг, за спаданням':
      sortedArray = sortedArray.sort((a, b) => b.mileage - a.mileage);
      break;
    case 'Від нових до старих':
      sortedArray = sortedArray.sort((a, b) => b.year - a.year);
      break;
    case 'Від старих до нових':
      sortedArray = sortedArray.sort((a, b) => a.year - b.year);
      break;
    default:
      break;
  }

  const arrayForRender = sortedArray.slice(start, end);
  console.log('arrayForRender :>> ', arrayForRender);
  return (
    <div className={`${styles.Container}`}>
      {isLoading && <Loader />}
      <div className={styles.title_container}>
        <button className={styles.backBtn} onClick={handleBackClick}>
          <Back />
        </button>
        <h1 className={styles.emptyFavorite}>Обрані</h1>
        {/* <div className={styles.dropdownMenu}>
          <Dropdown
            updateStyle="favoritPage"
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
        </div> */}
      </div>
      <ul className={styles.list_cars}>
        {arrayForRender.map((car: any) => (
          <SearchingCard
            key={car.id}
            car={car}
            onShowMenu={handleOptionMenu}
            onInfoContainerClick={handleInfoContainerClick}
            onUpdateAfterHide={updateAfterHide}
            isShowMenu={optionMenuId === car.id}
            updateAfterAllHide={updateAfterAllHide}
            cancelFavorite={handleCancelFavorite}
            isFavoritePage="isFavoritePage"
          />
        ))}
      </ul>
      <CatalogPagination
        forcePage={paginations.page}
        onSetPage={handleShowMore}
        currentPage={paginations.page}
        totalPages={totalPages}
        handlePageClick={handleChangePage}
        updateStyles="isFavoritesPage"
      />
    </div>
  );
};
