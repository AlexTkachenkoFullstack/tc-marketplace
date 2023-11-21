import React,{useEffect} from 'react';
import styles from "./SearchTop.module.scss";
import { Dropdown } from 'components/Dropdown/Dropdown';
import { DropdownSearch } from './Dropdown/DropdownSearch';
import {DropdownItem} from './Dropdown/components/DropdownItem'
import DropdownList from './Dropdown/components/DropdownList';
import DropdownSlider from './Dropdown/components/DropdownSlider'
import DropdownBtn from './Dropdown/components/DropdownBtn'
import { IRegion } from 'types/IRegion';
import { IType } from 'types/IType';
import { IModel } from 'types/IModel';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
// import {getFilterRegions, getFilterTypes } from 'redux/filter/selectors';
import { IBrand } from 'types/IBrand';
import { getFilterBrands, getFilterModels, getFilterRegions, getFilterTypes } from 'redux/filter/selectors';

type Props = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchTop: React.FC<Props> = ({ setIsActive }) => {
  const [carMark, setCarMark] = useState<string | string[]>('Всі марки')
  const [carModel, setCarModel] = useState<string | string[]>('Всі моделі')
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>('Всі регіони')
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>('Легкові')
  const [selectedVehicleBodyType, setSelectedVehicleBodyType] = useState<string | string[]>('Універсал')
  const [selectedCondition, setSelectedCondition] = useState<string | string[]>('Новий')
  const [selectedFilterCond, setSelectedFilterCond] = useState<string | string[]>('Пробіг, за зростанням')
  const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth > 1024);

  const models: IModel[] = useAppSelector(getFilterModels)
  const brands: IBrand[] = useAppSelector(getFilterBrands)
  const regions: IRegion[] = useAppSelector(getFilterRegions)
  const categories: IType[] = useAppSelector(getFilterTypes)  

  const sortedCond = ['Пробіг, за зростанням', 'Пробіг, за спаданням', 'Ціна, за зростанням', 'Ціна, за спаданням', 'Рік випуску, за зростанням', 'Рік випуску, за спаданням', 'За датою додавання']
  
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.SearchTop}>
      {isWideScreen ? (
        // Показується, коли ширина екрану > 1024
        <div className={styles.dropdownBox}>
          <Dropdown
            options={[...brands.map((brand) => brand.brand)].sort((a, b) => a.localeCompare(b))}
            label='Марка'
            startValue='Всі марки'
            option={carMark}
            setOption={setCarMark}
          />
          <Dropdown
            options={
              carMark !== 'Всі марки' ? models.map((item) => item.model) : []
            }
            label='Модель'
            startValue='Модель'
            checkboxAllowed
            allOptionsLabel='Всі марки'
            option={carModel}
            setOption={setCarModel}
            carMark={carMark}
          />

          <Dropdown
          options={regions.map((region) => region.region)}
          label='Розташування'
          startValue='Розташування'
          checkboxAllowed
          allOptionsLabel='Вся Україна'
          option={selectedRegions}
          setOption={setSelectedRegions}
        />
        </div>
      ) : (
        // Показується, коли ширина екрану <= 1024
        <Dropdown
          options={regions.map((region) => region.region)}
          label='Розташування'
          startValue='Розташування'
          checkboxAllowed
          allOptionsLabel='Вся Україна'
          option={selectedRegions}
          setOption={setSelectedRegions}
        />
      )}

      <div className={styles.bottom_row}>
        <div className={styles.leftBtns}>
          <DropdownSearch
            options={categories.map((category) => category.type)}
            label='Тип'
            startValue='Тип'
            checkboxAllowed
            allOptionsLabel='Всі типи'
            option={selectedCategory}
            setOption={setSelectedCategory}
          />

          <DropdownSlider nameType='Ціна' />

          {isWideScreen && <DropdownSearch
            options={['Універсал', 'Седан', 'Хетчбек', 'Позашляховик/Кроссовер', 'Кабріолет', 'Мінівен', 'Пікап', 'Лімузин']}
            label='Тип кузову'
            startValue='Тип кузову'
            checkboxAllowed
            allOptionsLabel='Всі типи'
            option={selectedVehicleBodyType}
            setOption={setSelectedVehicleBodyType}
          />}

          {isWideScreen && <DropdownSlider nameType='Пробіг' />}

          {isWideScreen && <DropdownItem 
            options={['Вживані', 'Нові', 'Всі']}
            label='Стан'
            startValue='Стан'
            allOptionsLabel='Всі'
            option={selectedCondition}
            setOption={setSelectedCondition}/>}
        </div>

        <div className={styles.rightBtns}>
          <div onClick={() => {
              setIsActive((prevState: boolean) => !prevState);
            }}><DropdownBtn nameType='Фільтр' />
          </div>
          {isWideScreen && <DropdownItem 
            options={sortedCond}
            label='Сортувати'
            startValue='Сортувати'
           
            option={selectedFilterCond}
            setOption={setSelectedFilterCond}/>}
        </div>
      </div>
    </div>
  );
};