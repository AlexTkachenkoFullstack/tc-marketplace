import styles from "./CatalogPagination.module.scss"
import { ReactComponent as LoadMoreIcon } from '../../../assets/icons/update.svg';

interface IProps {
  onSetPage: ()=>void;
}

const CatalogPagination: React.FC<IProps> = ({ onSetPage }) => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.LoadMoreBtn} onClick={onSetPage}>
        Завантажити більше <LoadMoreIcon />
      </button>
    </div>
  );
};

export default CatalogPagination;
