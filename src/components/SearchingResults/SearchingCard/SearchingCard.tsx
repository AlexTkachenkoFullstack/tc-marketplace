import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import cn from 'classnames';

import styles from './SearchingCard.module.scss';

import { isAuthUser } from 'redux/auth/selectors';
import { addToFavourites, removeFromFavourites } from 'redux/cars/operations';
import { hideAllTransport, hideTransport } from 'redux/filter/operations';

import { ICar } from 'types/IСar';

import LikeImg from '../../../assets/icons/favorite.svg';
import ActiveLikeImg from '../../../assets/icons/favorite-active.svg';
import { ReactComponent as EmptyIcon } from '../../../assets/icons/empty_icon.svg';
import { ReactComponent as OptionDots } from '../../../assets/icons/option_dots.svg';
import { ReactComponent as ClockIcon } from '../../../assets/icons/clock.svg';
import imagePlug from '../../../assets/images/imagePlug.webp';

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
}

const SearchingCard: React.FC<IProps> = ({
  car,
  onShowMenu,
  onInfoContainerClick,
  onUpdateAfterHide,
  isShowMenu,
  updateAfterAllHide,
  cancelFavorite,
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
      dispatch(removeFromFavourites(car?.id));
      
    } else {
      car && dispatch(addToFavourites(car?.id));
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
    <article className={styles.card}>
      <div className={styles.photo}>
        <NavLink to={`/catalog/${car?.id}`} className={styles.link}>
          <img
            className={styles.img}
            src={car?.fileUrl}
            alt={car?.brand}
            onError={onSrcImageError}
          />
        </NavLink>
        <div className={styles.iconIsFavouriteContainer} onClick={addFavorite}>
          <CommonBtn
            iconPath={car?.isFavorite && isAuth ? ActiveLikeImg : LikeImg}
            className={cn(styles.likeBtn)}
          />
        </div>
      </div>
      <div className={styles.infoContainer} onClick={onInfoContainerClick}>
        <button
          type="button"
          className={styles.optionBtn}
          onClick={event => car?.id !== undefined && onShowMenu(event, car.id)}
        >
          <OptionDots />
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

        <div className={styles.col}>
          <h3 className={styles.title}>
            {car?.brand} {car?.model} {car?.year}
          </h3>
        </div>
        <p className={styles.price}>{car?.price} $</p>
        <ul className={styles.techSpecs}>
          <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car && car.mileage !== undefined
              ? `${Math.floor(car.mileage / 1000)} тис. км`
              : 'Нема данних'}
          </li>
          <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car?.city}
          </li>
          <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car?.transmission}
          </li>
          <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car?.fuelType}, {car?.engineDisplacement}л
          </li>
          <li className={styles.techSpec}>
            <EmptyIcon className={styles.emptyIcon} />
            {car?.year} рік
          </li>
        </ul>

        <p id="discr" className={styles.description}>
          {car?.description}
        </p>

        <p className={styles.created}>
          <ClockIcon className={styles.clockIcon} />
          {created}
        </p>
      </div>
    </article>
  );
};

export default SearchingCard;
