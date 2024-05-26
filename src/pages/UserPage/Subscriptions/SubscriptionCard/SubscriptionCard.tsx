import React, { useEffect, useState } from 'react';
import { ISubscription } from 'types/ISubscription';
import styles from './SubscriptionCard.module.scss';
import { ReactComponent as BucketIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil.svg';
import { ReactComponent as UpdateBtnIcon } from '../../../../assets/icons/update_button.svg';
import { ReactComponent as MenuDotsIcon } from '../../../../assets/icons/option_dots.svg';

// import { subscriptionContent } from 'utils/descriptionContent';
import { useAppDispatch } from 'redux/hooks';
import { deleteSubscription, editSubscription } from 'redux/profile/operations';
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

  useEffect(() => {
    setIsNotify(notificationStatus);
  }, [notificationStatus]);

  const handleShowUpdate = () => {
    dispatch(cleanSubscrCarList());
    navigate('/advanced-search', { state: { id } });
  };

  const handleDelete = () => {
    dispatch(deleteSubscription(id));
    dispatch(deleteSubscrInState(id));
  };

  const handleEditSubscription = () => {
    handleEditParams(subscription);
  };

  const handleNotify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNotify(prev => !prev);
        dispatch(
          editSubscription({
            id,
            // modifiedRequestSearch: {},
            subscriptionRequest: { name, notificationEnabled: true },
          }),
        );
  };

  // useEffect(() => {
  //   if (notificationStatus !== isNotify) {
  //     dispatch(
  //       editSubscription({
  //         id,
  //         // modifiedRequestSearch: {},
  //         subscriptionRequest: { name, notificationEnabled: isNotify },
  //       }),
  //     );
  //   }
  // }, [dispatch, id, isNotify, name, notificationStatus]);

  console.log('subscription', subscription);
  return (
    <li className={styles.subscriptionCard}>
      <div className={styles.subscrHeader}>
        <div className={styles.nameThumb}>
          <h4>{name}</h4>
          <p>{`(${countNewTransports})`}</p>
        </div>
        <button type="button" className={styles.menuButton}>
          <MenuDotsIcon />
        </button>
        {isShowMenu && (
          <div className={styles.menuWrap}>
            <button type="button" onClick={handleShowUpdate}>
              <UpdateBtnIcon />
            </button>
            <button type="button" onClick={handleEditSubscription}>
              <PencilIcon />
            </button>
            <button type="button" onClick={handleDelete}>
              <BucketIcon />
            </button>
          </div>
        )}
      </div>
      <div className={styles.notification}>
        <p>Сповіщення</p>
        <input
          type="checkbox"
          id="notify"
          checked={isNotify}
          onChange={handleNotify}
        />
        <label htmlFor="notify" />
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
