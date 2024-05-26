import Loader from 'components/Loader/Loader';
import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile } from 'services/services';
import styles from './UserProfile.module.scss';
import { ReactComponent as Arrowback } from '../../assets/icons/arrow_back.svg';
// import Card from 'pages/UserPage/MyAds/Card/Card';
import SearchingCard from 'components/SearchingResults/SearchingCard';
import { deleteFavoriteCar } from 'redux/cars/slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { isAuthUser } from 'redux/auth/selectors';
interface IUserProfileAddsCar {
  id: number;
  type: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  transmission: string;
  fuelType: string;
  engineDisplacement: number;
  city: string;
  created: string;
  lastUpdated: string;
  fileUrl: string;
  isFavorite: boolean;
}
interface IUserProfileCategoryCar {
  type: string;
  count: number;
  adds: IUserProfileAddsCar[];
}
interface IUserProfile {
  id: number;
  name: string;
  region: string;
  city: string;
  photoUrl: string;
  transports: IUserProfileCategoryCar[];
}
const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [responseData, setResponseData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAuth = useAppSelector(isAuthUser);
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Вся техніка',
  );
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const [active, setActive] = useState<string | null>('Вся техніка');
  const categories = [
    'Вся техніка',
    'Легкові',
    'Мото',
    'Вантажівки',
    'Спецтехніка',
    'Сільгосптехніка',
    'Водний транспорт',
  ];
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const userId = parseInt(id);
          const response = await getUserProfile(userId);
          setResponseData(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          'Під час отримання даних користувача сталася помилка:',
          error,
        );
      }
    };

    fetchData();
  }, [id]);
  // const addFavorite = () => {
  //   if (!isAuth) {
  //     navigate('/login/log-in', { replace: true });
  //   }
  //   if (car?.isFavorite) {
  //     car && dispatch(removeFromFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));   
  //   } else {
  //     car && dispatch(addToFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));   
  //   }
  // };
  const handleSelectCategory = (category: string) => {
    setActive(category);
    setSelectedCategory(category);
  };

  const addsTranspots: any = [];
  responseData &&
    responseData.transports.forEach(el => {
      addsTranspots.push(...el.adds);
    });
  const handleBack = () => {
    navigate(-1);
  };
  const counterCars: { [key: string]: number } = {};
  addsTranspots.forEach((item: any) => {
    const type = item.type;
    counterCars[type] = (counterCars[type] || 0) + 1;
  });

  const arrayForRendering: any = [];
  addsTranspots.forEach((el: any) => {
    if (selectedCategory === el.type) {
      arrayForRendering.push(el);
    }
    if (selectedCategory === 'Вся техніка') {
      arrayForRendering.push(el);
    }
  });
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
  const counterAllTranspots =
    addsTranspots && addsTranspots.length ? addsTranspots.length : 0;

  if (isLoading) {
    return <Loader />;
  }

  if (!responseData) {
    return <div>Дані користувача не знайдено</div>;
  }

  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.title_container}>
          <div className={styles.wrapper}>
            <div className={styles.wrapper_title}>
              <button className={styles.btn_back} onClick={handleBack}>
                <Arrowback className={styles.svg_back} />
              </button>
              <h1 className={styles.title}>{responseData.name}</h1>
            </div>
            <div
              className={`${
                responseData.photoUrl !== null
                  ? styles.img_container
                  : styles.no_img
              }`}
            >
              {responseData.photoUrl && (
                <img
                  src={responseData.photoUrl}
                  alt=""
                  className={styles.user_photo}
                />
              )}
            </div>
          </div>
          <p className={styles.text}>
            {responseData.city}, {responseData.region}
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.category_container}>
          <button
            className={`${styles.tab} ${
              categories[0] === active ? styles.active : ''
            }`}
            onClick={() => handleSelectCategory(categories[0])}
          >
            {categories[0]}
            {counterAllTranspots !== 0 && (
              <span className={styles.count}>{counterAllTranspots}</span>
            )}
          </button>
          {counterCars.hasOwnProperty(categories[1]) && (
            <button
              className={`${styles.tab} ${
                categories[1] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[1])}
            >
              {categories[1]}

              {counterCars.hasOwnProperty(categories[1]) && (
                <span className={styles.count}>
                  {counterCars[categories[1]]}
                </span>
              )}
            </button>
          )}
          {counterCars.hasOwnProperty(categories[2]) && (
            <button
              className={`${styles.tab} ${
                categories[2] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[2])}
            >
              {categories[2]}
              {counterCars.hasOwnProperty(categories[2]) && (
                <span className={styles.count}>
                  {counterCars[categories[2]]}
                </span>
              )}
            </button>
          )}
          {counterCars.hasOwnProperty(categories[3]) && (
            <button
              className={`${styles.tab} ${
                categories[3] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[3])}
            >
              {categories[3]}

              {counterCars.hasOwnProperty(categories[3]) && (
                <span className={styles.count}>
                  {counterCars[categories[3]]}
                </span>
              )}
            </button>
          )}
          {counterCars.hasOwnProperty(categories[4]) && (
            <button
              className={`${styles.tab} ${
                categories[4] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[4])}
            >
              {categories[4]}
              {counterCars.hasOwnProperty(categories[4]) && (
                <span className={styles.count}>
                  {counterCars[categories[4]]}
                </span>
              )}
            </button>
          )}
          {counterCars.hasOwnProperty(categories[5]) && (
            <button
              className={`${styles.tab} ${
                categories[5] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[5])}
            >
              {categories[5]}

              {counterCars.hasOwnProperty(categories[5]) && (
                <span className={styles.count}>
                  {counterCars[categories[5]]}
                </span>
              )}
            </button>
          )}
          {counterCars.hasOwnProperty(categories[6]) && (
            <button
              className={`${styles.tab} ${
                categories[6] === active ? styles.active : ''
              }`}
              onClick={() => handleSelectCategory(categories[6])}
            >
              {categories[6]}

              {counterCars.hasOwnProperty(categories[6]) && (
                <span className={styles.count}>
                  {counterCars[categories[6]]}
                </span>
              )}
            </button>
          )}
        </div>
        <ul className={styles.item}>
          {arrayForRendering &&
            arrayForRendering.map((car: any) => (
              <SearchingCard
              key={car.id}
              car={car}
              onShowMenu={handleOptionMenu}
              onInfoContainerClick={handleInfoContainerClick}
              onUpdateAfterHide={updateAfterHide}
              isShowMenu={optionMenuId === car.id}
              updateAfterAllHide={updateAfterAllHide}
              cancelFavorite={handleCancelFavorite}
              isDisabled={true}
            />
            ))}
        </ul>
      </div>
    </>
  );
};

export default UserProfile;
