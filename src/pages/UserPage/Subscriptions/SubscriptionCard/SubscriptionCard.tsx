import React, { useEffect, useRef, useState } from 'react';
import { ISubscription } from 'types/ISubscription';
import styles from './SubscriptionCard.module.scss';
import { ReactComponent as BucketIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil.svg';
import { ReactComponent as ShowSubscrIcon } from '../../../../assets/icons/north_east_black.svg';
import { ReactComponent as MenuDotsIcon } from '../../../../assets/icons/option_dots.svg';

import { useAppDispatch } from 'redux/hooks';
import {
  deleteSubscription,
  editSubscription,
  fetchSubscriptions,
} from 'redux/profile/operations';
import { cleanSubscrCarList, deleteSubscrInState } from 'redux/profile/slice';
import { useNavigate } from 'react-router-dom';

interface IProps {
  subscription: ISubscription;
  handleEditParams: (subscr: ISubscription) => void;
}

const SubscriptionCard: React.FC<IProps> = ({
  subscription,
  handleEditParams,
}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    name,
    countNewTransports,
    // parameterResponse,
    id,
    notificationStatus,
  } = subscription;

  const menuRef = useRef<HTMLDivElement>(null);
  const menuThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuThumbRef.current &&
        !menuThumbRef.current.contains(event.target as Node)
      ) {
        setIsShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isShowMenu) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }, [isShowMenu]);

  useEffect(() => {
    setIsNotify(notificationStatus);
  }, [notificationStatus]);

  const handleShowUpdate = () => {
    dispatch(cleanSubscrCarList());
    navigate('/advanced-search', { state: { id } });
  };

  const handleDelete = () => {
    dispatch(deleteSubscription(id)).then(() =>
      dispatch(deleteSubscrInState(id)),
    );
    ;
  };

  const handleEditSubscription = () => {
    handleEditParams(subscription);
  };

  const handleShowMenu = () => {
    setIsShowMenu(prev => !prev);
  };

  const handleNotify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotify(prev => !prev);
    dispatch(
      editSubscription({
        id,
        subscriptionRequest: { name, notificationEnabled: !isNotify },
      }),
    ).then(() => dispatch(fetchSubscriptions()));
  };

  return (
    <li className={styles.subscriptionCard}>
      <div className={styles.subscrHeader}>
        <div className={styles.nameThumb}>
          <h4>{name}</h4>
          <p>{`(${countNewTransports})`}</p>
        </div>
        <div className={styles.menuWrapper}>
          <div
            className={styles.menuButton}
            onClick={handleShowMenu}
            ref={menuRef}
          >
            <MenuDotsIcon />
          </div>
          {isShowMenu && (
            <div className={styles.menuThumb} ref={menuThumbRef}>
              <button type="button" onClick={handleShowUpdate}>
                <ShowSubscrIcon />
                Показати оголошення
              </button>
              <button type="button" onClick={handleEditSubscription}>
                <PencilIcon />
                Редагувати
              </button>
              <button type="button" onClick={handleDelete}>
                <BucketIcon />
                Видалити
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.notification}>
        <p>Сповіщення</p>
        <input
          type="checkbox"
          id={`notify${id}`}
          checked={isNotify}
          onChange={handleNotify}
        />
        <label htmlFor={`notify${id}`} />
      </div>
      {/* <div>
        <p className={styles.content}>
          {subscriptionContent(parameterResponse)}
        </p>
      </div> */}
    </li>
  );
};

export default SubscriptionCard;
