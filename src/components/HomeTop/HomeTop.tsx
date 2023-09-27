import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';

const models = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const brands = ['Toyota', 'Ford', 'BMW', 'Audi', 'Lexus'];
const regions = ['Kyiv', 'Odesa', 'Lviv'];
const categories = ['Всі', 'Легкові', 'Мотоцикли', 'Електротранспорт', 'Причепи', 'Вантажівки', 'Водний транспорт'];

export const HomeTop = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Всі');
  const [active, setActive] = useState(false);

  return (
    <div className={styles.homeTop}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Title
        </h2>
        <CategoryBar
          categories={categories}
          handleSelect={setSelectedCategory}
        />

        <div className={styles.container_bottom}>
          <div className={styles.select_bar}>

            <Dropdown
              options={models}
              label='Модель'
              startValue='Модель'
              // setActive={setActive}
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

            {/* <select className={styles.select_window}>
              <option value="model">
                <span>Модель</span>
              </option>

              {models.map(model => (
              <option value={model} key={model}>
                <span>{model}</span>
              </option>
              ))}

            </select>

            <select className={styles.select_window}>
              <option value="">
                <span>Марка</span>
              </option>

              {brands.map(brand => (
              <option value={brand} key={brand}>
                <span>{brand}</span>
              </option>
              ))}

            </select>

            <select className={styles.select_window}>
              <option value="city">
                <span>Регіон</span>
              </option>

              {regions.map(region => (
              <option value={region} key={region}>
                <span>{region}</span>
              </option>
              ))}
            </select> */}
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
