import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';
import Category from 'types/Category';
// import { getProductCategories } from 'api/search';
// import { ProductCategory } from 'types';

const models = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const brands = ['Toyota', 'Ford', 'BMW', 'Audi', 'Lexus'];
const regions = ['Kyiv', 'Odesa', 'Lviv'];
const categories1 = ['Всі', 'Легкові', 'Мотоцикли', 'Електротранспорт', 'Причепи', 'Вантажівки', 'Водний транспорт'];

export const HomeTop = () => {
  // const [selectedModel, setSelectedModel] = useState<string | null>(null);
  // const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  // const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Всі');
  // const [active, setActive] = useState(false);

  return (
    <div className={styles.homeTop}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Title
        </h2>
        <CategoryBar
          categories={categories1}
          handleSelect={setSelectedCategory}
        />

        <div className={styles.container_bottom}>
          <div className={styles.select_bar}>

            <Dropdown
              options={models}
              label='Модель'
              startValue='Модель'
            />

            <Dropdown
              options={brands}
              label='Марка'
              startValue='Марка'
            />

            <Dropdown
              options={regions}
              label='Регіон'
              startValue='Регіон'
            />
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
