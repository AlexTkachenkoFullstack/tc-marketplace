import styles from './CategoryBar.module.scss';
import scroll from '../../assets/icons/arrow_right.svg';
import { useRef } from 'react';

export const CategoryBar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  return (
  <div className={styles.container}>
    <div className={styles.category_bar} ref={containerRef}>
      <button className={styles.category}>Всі</button>
      <button className={styles.category}>Легкові</button>
      <button className={styles.category}>Мотоцикли</button>
      <button className={styles.category}>Електротранспорт</button>
      <button className={styles.category}>Причепи</button>
      <button className={styles.category}>Вантажівки</button>
      <button className={styles.category}>Водний&nbsp;транспорт</button>
    </div>
      <button className={styles.container__scroll} onClick={handleScrollRight}>
        <img src={scroll} alt="scroll" />
      </button>
  </div>
  );
};
