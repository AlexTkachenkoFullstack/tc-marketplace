import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
// import { GoToTopButton } from '../../components/GoToTopButton/GoToTopButton';

export const HomeTop = () => {
  return (
    <div className={styles.homeTop}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Title
        </h2>
        <CategoryBar />

        <div className={styles.container_bottom}>
          <div className={styles.select_bar}>
            <select className={styles.select_window}>
              <option value="model">
                <span>Модель</span>
              </option>
            </select>

            <select className={styles.select_window}>
              <option value="">
                <span>Марка</span>
              </option>
            </select>

            <select className={styles.select_window}>
              <option value="city">
                <span>Київ</span>
              </option>
            </select>
          </div>

          <div className={styles.search}>
            <button className={styles.search_button}>
              <span className={styles.search_button_text}>Шукати</span>
              <img src={arrow} alt="search" />
            </button>
            <button className={styles.search_more}>Розширений пошук</button>
          </div>
        </div>

      </div>
      {/* <GoToTopButton /> */}
    </div>
  );
};
