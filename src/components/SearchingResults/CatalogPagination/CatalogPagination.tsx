import styles from "./CatalogPagination.module.scss"
import { ReactComponent as LoadMoreIcon } from '../../../assets/icons/update.svg';

const CatalogPagination = () => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.LoadMoreBtn}>
        Завантажити більше <LoadMoreIcon />
      </button>
    </div>
  );
};

export default CatalogPagination;
