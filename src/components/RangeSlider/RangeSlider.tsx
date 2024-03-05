import React, { useState,useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './newStyles.css'
import styles from './RangeSlider.module.scss';

interface SliderValue {
  from: number;
  to: number;
}

interface RangeSliderProps {  
  setObjectValue: React.Dispatch<React.SetStateAction<{ from: number;
    to: number;}>>,
  typeRange:string
}

const RangeSlider: React.FC<RangeSliderProps> = ({setObjectValue, typeRange}) => {
  
  const [value, setValue] = useState<SliderValue>({from:0,to:0}); // начальное значение 

  useEffect(() => {
    const [min, max] = startValue(typeRange);
    if (min !== undefined && max !== undefined){
    setValue({ from: min, to: max }); // установить начальные значения при загрузке страницы
    setObjectValue({ from: min, to: max });
    }
  }, [typeRange,setObjectValue]); 
  function startValue(typeRange:string){
    let min ;
    let max ;
      switch (typeRange) {
      case  "price" :
        min = 1000
        max = 1000000
      break;
      case  "year" :
        min = 1970
        max = 2024
      break;
      case  "mileage" :
        min = 10
        max = 1000000
      break;
      case  "enginePower" :
        min = 10
        max = 1000
      break;
      case  "numberOfDoors" :
        min = 2
        max = 5
      break;
      case  "numberOfSeats" :
        min = 2
        max = 7
      break;  
      }
      return [min,max]
  } 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const name = event.target.name;
    let inputValue  = parseInt(event.target.value);
    const newValue = {...value}
    if(name === "from"){
      newValue.from=inputValue
      newValue.to=inputValue
    } else {
      newValue.to=inputValue
    }  
    setValue(newValue);   
    setObjectValue(newValue)
  };

  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      // Если newValue - число, это означает, что один из бегунков слайдера был передвинут
      setValue({ from: newValue, to: newValue });
      setObjectValue({ from: newValue, to: newValue });
    } else {
      // Если newValue - массив чисел, это означает, что диапазон был изменен
      setValue({ from: newValue[0], to: newValue[1] });
      setObjectValue({ from: newValue[0], to: newValue[1] });
    }
  };

  const [min, max] = startValue(typeRange);

  return (
    <>
      <div className={styles.inputBlokResultAddBrand}>      
        <input
          type="text"
          id="from"           
          name="from"
          className={styles.priceLeftAddBrand}
          value={value.from}
          onChange={handleInputChange}        
        /> <span  className={styles.centralDivider}></span>
        <input
          type="text"
          id="to"           
          name="to"
          className={styles.priceRightAddBrand}
          value={value.to}
          onChange={handleInputChange}       
        />
      </div>
      <div className={styles.inputBlokRangeAddBrand}>
        <Slider 
          range  
          className='newStyles' 
          min={min}  
          max={max}  
          value={[value.from, value.to]} 
          onChange={handleSliderChange}
          allowCross={false}
        />
      </div>
    </>
  );    
};

export default RangeSlider;