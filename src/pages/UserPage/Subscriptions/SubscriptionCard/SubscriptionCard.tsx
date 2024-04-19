import React, {  useRef } from 'react';
import { ISubscription } from 'types/ISubscription';
import styles from './SubscriptionCard.module.scss';
import { ReactComponent as BucketIcon } from '../../../../assets/icons/delete.svg';
import { ReactComponent as PencilIcon } from '../../../../assets/icons/pencil.svg';
import { ReactComponent as UpdateBtnIcon } from '../../../../assets/icons/update_button.svg';

import { subscriptionContent } from 'utils/descriptionContent';
import { useAppDispatch } from 'redux/hooks';
import { deleteSubscription } from 'redux/profile/operations';
import { deleteSubscrInState } from 'redux/profile/slice';
import { useNavigate } from 'react-router-dom';

interface IProps {
  subscription: ISubscription;
  handleEditParams: (subscr: ISubscription) => void;
}

const SubscriptionCard: React.FC<IProps> = ({
  subscription,
  handleEditParams,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { name, countNewTransports, parameterResponse, id } = subscription;

  const handleShowUpdate = () => {
    navigate('/advanced-search', {state: {id}});
  };

  const handleDelete = () => {
    dispatch(deleteSubscription(id));
    dispatch(deleteSubscrInState(id));
  };

  const editSubscription = () => {
    handleEditParams(subscription);
  };

  return (
    <li className={styles.subscriptionCard}>
      <div className={styles.subscrHeader}>
        <div className={styles.nameThumb}>
          <h4 ref={nameRef}>{name}</h4>
          <p>{`(${countNewTransports})`}</p>
        </div>
        <div className={styles.menuWrap}>
          <button type="button" onClick={handleShowUpdate}>
            <UpdateBtnIcon />
          </button>
          <button type="button" onClick={editSubscription}>
            <PencilIcon />
          </button>
          <button type="button" onClick={handleDelete}>
            <BucketIcon />
          </button>
        </div>
      </div>
      <div>
        <p className={styles.content}>
          {subscriptionContent(parameterResponse)}
        </p>
      </div>
    </li>

  );
};

export default SubscriptionCard;
