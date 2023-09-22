import { HomeTop } from 'components/HomeTop/HomeTop';
import styles from './HomePage.module.scss';
// import { GoToTopButton } from '../../components/GoToTopButton/GoToTopButton';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <HomeTop />
      <div className={styles.main}>
        <section className={styles.new}>
          <h2 className={styles.new__title}>Нещодавно переглянуті товари</h2>
          <div className={styles.card_container}>
            <article className={styles.card}>fgsdf</article>
            <article className={styles.card}>sfdf</article>
            <article className={styles.card}>sdfds</article>
          </div>
        </section>

        <section className={styles.new}>
          <h2 className={styles.new__title}>Нові автомобілі на сайті</h2>
          <div className={styles.card_container}>
            <article className={styles.card}>fgsdf</article>
            <article className={styles.card}>sfdf</article>
            <article className={styles.card}>sdfds</article>
          </div>
        </section>

        <section className={styles.new}>
          <h2 className={styles.new__title}>Популярні товари</h2>
          <div className={styles.card_container}>
            <article className={styles.card}>fgsdf</article>
            <article className={styles.card}>sfdf</article>
            <article className={styles.card}>sdfds</article>
          </div>
        </section>
      </div>
    </div>
  );
};
