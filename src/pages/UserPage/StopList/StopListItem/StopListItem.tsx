import React from 'react';
import { ReactComponent as Trash } from '../../../../assets/icons/Vector-trash.svg';
import { ReactComponent as Arrow } from '../../../../assets/icons/north_east_black.svg';
import styles from './StopListItem.module.scss';

type Props = {
  onClickDelete: (id: number) => void;
  onClickRedirect:(id:number)=>void;
  id: number;
  title: string;
  userPhoto: string;
};
const StopListItem: React.FC<Props> = props => {
  const { id, title, userPhoto, onClickDelete,onClickRedirect } = props;
  return (
    <>
      <li className={styles.item}>
        <div className={styles.item_wrapper}>
          <div
            className={`${
              userPhoto !== null ? styles.img_container : styles.no_img
            }`}
          >
            {userPhoto && <img src={userPhoto} alt="" className={styles.img} />}
          </div>
          <p className={styles.text}>{title}</p>
        </div>
        <div className={styles.svg_wrapper}>
          <button className={styles.icon} onClick={() => onClickRedirect(id)}>
            <Arrow />
          </button>
          <button className={styles.icon} onClick={() => onClickDelete(id)}>
            <Trash />
          </button>
        </div>
      </li>
    </>
  );
};

export default StopListItem;
