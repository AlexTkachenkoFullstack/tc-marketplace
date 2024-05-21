import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import cn from 'classnames';

import styles from './SearchingCard.module.scss';

import { isAuthUser } from 'redux/auth/selectors';
import { addToFavourites, fetchFavoriteCars, removeFromFavourites } from 'redux/cars/operations';
import { hideAllTransport, hideTransport } from 'redux/filter/operations';

import { ICar } from 'types/IСar';

// import ActiveLikeImg from '../../../assets/icons/favorite-active.svg';
// import { ReactComponent as EmptyIcon } from '../../../assets/icons/empty_icon.svg';
import { ReactComponent as OptionDots } from '../../../assets/icons/option_dots.svg';
// import { ReactComponent as ClockIcon } from '../../../assets/icons/clock.svg';
import imagePlug from '../../../assets/images/imagePlug.webp';
import { ReactComponent as Millage } from '../../../assets/icons/millage.svg';
import { ReactComponent as Transmission } from '../../../assets/icons/transmission.svg';
import { ReactComponent as Fuel } from '../../../assets/icons/fuel.svg';
import { ReactComponent as CalendarMonth } from '../../../assets/icons/calendar_month.svg';
import { ReactComponent as Location } from '../../../assets/icons/location.svg';
import { ReactComponent as FavoriteActive } from '../../../assets/icons/favorite-active.svg';
import { ReactComponent as Favorite } from '../../../assets/icons/favorite.svg';
import { CommonBtn } from 'components/Buttons/CommonBtn';

import { convertDate } from 'utils/convertDate';

interface IProps {
  car?: ICar;
  onShowMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    carId: number,
  ) => void;
  onInfoContainerClick: () => void;
  onUpdateAfterHide: () => void;
  isShowMenu: boolean;
  updateAfterAllHide: () => void;
  cancelFavorite?: (id: number) => void;
  isDisabled?: boolean;
}

const SearchingCard: React.FC<IProps> = ({
  car,
  onShowMenu,
  onInfoContainerClick,
  onUpdateAfterHide,
  isShowMenu,
  updateAfterAllHide,
  cancelFavorite,
  isDisabled,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isAuthUser);

  const addFavorite = () => {
    if (!isAuth) {
      navigate('/login/log-in', { replace: true });
    }
    if (car && car.isFavorite) {
      if (typeof cancelFavorite === 'function') {
        cancelFavorite(car.id);
      }
      dispatch(removeFromFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));
 
    } else {
      car && dispatch(addToFavourites(car?.id)).then(()=>dispatch(fetchFavoriteCars()));      
    }
  };

  const created = car?.created ? convertDate(car.created) : '';

  const handleHideAdvert = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const buttonId = (e.target as HTMLElement).closest('button')?.id;
    if (buttonId === 'hideAdvert') {
      car && dispatch(hideTransport(car.id)).then(() => onUpdateAfterHide());
    } else if (buttonId === 'hideAllAdverts') {
      car &&
        dispatch(hideAllTransport(car.id)).then(() => updateAfterAllHide());
    }
    onInfoContainerClick();
  };

  const onSrcImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = imagePlug;
  };

  return (
    <div className={styles.card}>
      <div className={styles.photo}>
        <NavLink to={`/catalog/${car?.id}`} className={styles.link}>
          <img
            className={styles.img}
            src={car?.fileUrl}
            alt={car?.brand}
            onError={onSrcImageError}
          />
        </NavLink>
      </div>
      <div className={styles.infoContainer} onClick={onInfoContainerClick}>

        <div className={styles.col}>
          <h3 className={styles.title}>
            {car?.brand} {car?.model} {car?.year}
          </h3>
          <button
            className={styles.iconIsFavouriteContainer}
            onClick={addFavorite}
          >
           {car?.isFavorite && isAuth ? <FavoriteActive className={styles.favorite}/>:
            <Favorite className={styles.favorite}/>}
          </button>
        <button
          style={{ display: isDisabled ? 'none' : '' }}
          type="button"
          className={styles.optionBtn}
          onClick={event => car?.id !== undefined && onShowMenu(event, car.id)}
        >
          <OptionDots  className={styles.option_dots}/>
        </button>
        <div
          className={styles.optionMenu}
          style={{ display: isShowMenu ? 'flex' : 'none' }}
          onClick={handleHideAdvert}
        >
          <button type="button" id="hideAdvert">
            Приховати оголошення
          </button>
          <button type="button" id="hideAllAdverts">
            Приховати всі оголошення автора
          </button>
        </div>
        </div>
        <p className={styles.price}>{car?.price} $</p>
        <ul className={styles.techSpecs}>
          <div className={styles.wrapper}>
            <li className={styles.techSpec}>
              <Millage className={styles.emptyIcon} />
              {car && car.mileage !== undefined
                ? `${Math.floor(car.mileage / 1000)} тис. км`
                : 'Нема данних'}
            </li>

            <li className={styles.techSpec}>
              <Location className={styles.emptyIcon} />
              {car?.city}
            </li>
          </div>
          <div className={styles.wrapper}>
            <li className={styles.techSpec}>
              <Transmission className={styles.emptyIcon} />
              {car?.transmission}
            </li>

            <li className={styles.techSpec}>
              <Fuel className={styles.emptyIcon} />
              {car?.fuelType}, {car?.engineDisplacement}л
            </li>
          </div>
          {/* <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car?.year} рік
          </li> */}
        </ul>

        <p
          id="discr"
          className={styles.description}
          style={{ display: isDisabled ? 'none' : '' }}
        >
          {car?.description}
        </p>

        <p className={styles.created}>
          <CalendarMonth
            className={styles.clockIcon}
            style={{ display: isDisabled ? 'none' : '' }}
          />
          {created}
        </p>
      </div>
    </div>
  );
};

export default SearchingCard;
