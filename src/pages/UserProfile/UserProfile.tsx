import Loader from 'components/Loader/Loader';
import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserProfile } from 'services/services';
import styles from './UserProfile.module.scss';
import { ReactComponent as Arrowback } from '../../assets/icons/arrow_back.svg';
import Card from 'pages/UserPage/MyAds/Card/Card';
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
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Вся техніка',
  );
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

  const counterAllTranspots =
    addsTranspots && addsTranspots.length ? addsTranspots.length : 0;

  if (isLoading) {
    return <Loader />;
  }



  if (!responseData) {
    return <div>Дані користувача не знайдено</div>;
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>        
        <button className={styles.btn_back} onClick={handleBack}>
          <Arrowback />
        </button>       
        <h1 className={styles.title}>Профіль користувача</h1>
      </div>
      <div className={styles.user_info_container}>
        <div className={styles.wrapper}>
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
          <div>
            <h2 className={styles.user_title}>{responseData.name}</h2>
            <p className={styles.text}>
              {responseData.city}, {responseData.region}
            </p>
          </div>
        </div>
        {/* <button
          className={styles.btn_subscription}
          onClick={() => handleSubscripion(1)}
        >
          Підписатись на автора
        </button> */}
      </div>
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
              <span className={styles.count}>{counterCars[categories[1]]}</span>
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
              <span className={styles.count}>{counterCars[categories[2]]}</span>
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
              <span className={styles.count}>{counterCars[categories[3]]}</span>
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
              <span className={styles.count}>{counterCars[categories[4]]}</span>
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
              <span className={styles.count}>{counterCars[categories[5]]}</span>
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
              <span className={styles.count}>{counterCars[categories[6]]}</span>
            )}
          </button>
        )}
      </div>
      <ul className={styles.item}>
        {arrayForRendering &&
          arrayForRendering.map((car: any) => (
            <Card key={car.id} car={car} isDisabled={true} onClickDelete={() => {}} />
          ))}
      </ul>
    </div>
  );
};

export default UserProfile;
