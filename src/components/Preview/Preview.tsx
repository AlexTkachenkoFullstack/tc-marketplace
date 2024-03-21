import { FC } from 'react';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import styles from './Preview.module.scss';
import { UploadedImage } from 'types/UploadedImage';

type Props = {
  onDelete: (image: string) => void;
  image: UploadedImage;
  addMainPhoto: (imageId: string) => void;
};

export const Preview: FC<Props> = ({ image, onDelete, addMainPhoto }) => {
  const { name, url } = image;

  return (
    <div className={styles.imgCard}>
      <div className={styles.box_input}>
        <input type="checkbox" id="foto1" onChange={() => addMainPhoto(name)} />
        <label htmlFor="foto1" className={styles.label_title}>
          Головне
        </label>
      </div>
      <button className={styles.close_btn} onClick={() => onDelete(image.id)}>
        <Close />
      </button>
      {typeof url === 'string' && <img src={url} alt={name} />}
    </div>
  );
};
