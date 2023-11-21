import React from 'react';
import styles from "./SearchTop.module.scss";
import { Dropdown } from 'components/Dropdown/Dropdown';
import { DropdownSearch } from './Dropdown/DropdownSearch';
import DropdownSlider  from './Dropdown/components/DropdownSlider'
import DropdownBtn from './Dropdown/components/DropdownBtn'
import { IRegion } from 'types/IRegion';
import { IType } from 'types/IType';
import {useState } from 'react';
import {useAppSelector } from 'redux/hooks';
import {getFilterRegions, getFilterTypes } from 'redux/filter/selectors';

type Props = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchTop: React.FC<Props> = ({ setIsActive }) =>{
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>('Всі регіони')
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>('Легкові')
  const regions: IRegion[] = useAppSelector(getFilterRegions)
  const categories: IType[] = useAppSelector(getFilterTypes)
  console.log(regions);
  return (
    <div className={styles.SearchTop}>
      <Dropdown
        options={regions.map((region) => region.region)}
        label='Розташування'
        startValue='Розташування'
        checkboxAllowed
        allOptionsLabel='Вся Україна'
        option={selectedRegions}
        setOption={setSelectedRegions}
      />

      <div className={styles.bottom_row}>
        <div className={styles.left}>
          <DropdownSearch
              options={categories.map((category) => category.type)}
              label='Тип'
              startValue='Тип'
              checkboxAllowed
              allOptionsLabel='Всі типи'
              option={selectedCategory}
              setOption={setSelectedCategory}
            />
          <DropdownSlider nameType="Ціна" />
        </div>
        
        <div  onClick={() => {
          setIsActive((prevState: boolean) => !prevState);
        }} className={styles.right}>
          <DropdownBtn nameType="Фільтр" />
        </div>
      </div>
    </div>
  );
};