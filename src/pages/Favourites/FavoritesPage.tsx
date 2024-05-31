import { FC, useEffect, useState } from 'react';
import styles from './FavoritesPage.module.scss';
// import { getFavoritesCars } from 'services/services';
import SearchingCard from 'components/SearchingResults/SearchingCard';
import CatalogPagination from 'components/SearchingResults/CatalogPagination';
import Loader from 'components/Loader/Loader';
// import { Dropdown } from 'components/Dropdown/Dropdown';
import { ReactComponent as Back } from '../../assets/icons/arrow_back.svg';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteCars } from 'redux/cars/operations';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getFavoriteCars } from 'redux/cars/selectors';
import { deleteFavoriteCar } from 'redux/cars/slice';
import plug from '../../assets/images/Property 1=08.svg';

export const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  // const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  // const [favoriteCars, setResponseData] = useState<any[]>([]);
  const favoriteCars = useAppSelector(getFavoriteCars);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(15);
  const totalAdverts = favoriteCars.length;
  const advertsPerPage = 15;
  const totalPages =
    totalAdverts !== null ? Math.ceil(totalAdverts / advertsPerPage) : 1;
  const [paginations, setPaginations] = useState({ page: 0 });

  useEffect(() => {
    dispatch(fetchFavoriteCars());
  }, [dispatch]);

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
    dispatch(deleteFavoriteCar(id));
  };

  const handleShowMore = () => {
    setIsLoading(true)
    const newStart = 0;
    const newEnd = end + advertsPerPage;
    setStart(newStart);
    setEnd(newEnd);
    setPaginations(prev => ({ ...prev, page: prev.page + 1 }));
    setIsLoading(false)
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    setIsLoading(true)
    const newStart = selected * advertsPerPage;
    const newEnd = newStart + advertsPerPage;
    setStart(newStart);
    setEnd(newEnd);
    setPaginations(prev => ({ ...prev, page: selected }));
    setIsLoading(false)
  };

  const handleBackClick = () => {
    setIsLoading(true)
    navigate(-1);
  };
  let sortedArray = [...favoriteCars]; // Copy the favoriteCars array

  // switch (typeOfSort) {
  //   case 'Від дешевих до дорогих':
  //     sortedArray = sortedArray.sort((a, b) => a.price - b.price);
  //     break;
  //   case 'Від дорогих до дешевих':
  //     sortedArray = sortedArray.sort((a, b) => b.price - a.price);
  //     break;
  //   case 'Пробіг, за зростанням':
  //     sortedArray = sortedArray.sort((a, b) => a.mileage - b.mileage);
  //     break;
  //   case 'Пробіг, за спаданням':
  //     sortedArray = sortedArray.sort((a, b) => b.mileage - a.mileage);
  //     break;
  //   case 'Від нових до старих':
  //     sortedArray = sortedArray.sort((a, b) => b.year - a.year);
  //     break;
  //   case 'Від старих до нових':
  //     sortedArray = sortedArray.sort((a, b) => a.year - b.year);
  //     break;
  //   default:
  //     break;
  // }
  const arrayForRender = sortedArray.slice(start, end);
  return (
    <section className={styles.favorite}>
      <div className={styles.title_container}>
        <div className={styles.wrapper}>
          <button className={styles.backBtn} onClick={handleBackClick}>
            <Back className={styles.svg_btn} />
          </button>
          <h1 className={styles.emptyFavorite}>Обрані</h1>
        </div>
      </div>
      <div className={`${styles.Container}`}>
        {isLoading && <Loader />}

        {arrayForRender.length > 0 ? (
          <>
            <ul className={styles.list_cars}>
              {arrayForRender.map((car: any) => (
                <SearchingCard
                  key={car.id}
                  car={car}
                  onShowMenu={handleOptionMenu}
                  onInfoContainerClick={handleInfoContainerClick}
                  onUpdateAfterHide={updateAfterHide}
                  isShowMenu={false}
                  updateAfterAllHide={updateAfterAllHide}
                  cancelFavorite={handleCancelFavorite}
                  isDisabled={true}
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
          </>
        ) : (
          <div className={styles.img_container}>
            <img src={plug} alt="" className={styles.plug_img} />
            <p className={styles.text}>Обрані оголошення відображаються тут</p>
          </div>
        )}
      </div>
    </section>
  );
};
