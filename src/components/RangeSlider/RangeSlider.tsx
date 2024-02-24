import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import  styles from './RangeSlider.module.scss';


//objectValue: object //возможно он неннужен

interface RangeSliderProps {  
  setObjectValue: React.Dispatch<React.SetStateAction<{ from: number;
    to: number;}>>,
  typeRange:string
}

const RangeSlider: React.FC<RangeSliderProps> = ({setObjectValue,typeRange}) => {
  
  // console.log('key :>> ', typeRange);
  const [value, setValue] = useState({from:0,to:0}); // начальное значение 

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
      max = 20
    break;  
    }
    return [min,max]
} 
// console.log('value :>> ', value);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const name = event.target.name;
    let inputValue  = parseInt(event.target.value);
    const newValue = {...value}
if(name === "from"){
  newValue.from=inputValue
  newValue.to=inputValue
}else {
  newValue.to=inputValue
}  
    setValue(newValue);   
    setObjectValue(newValue)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let inputValue  = parseInt(event.target.value);    
    // if (isNaN(inputValue) )  {
    //   inputValue = 1970; // в случае некорректного ввода установим значение по умолчанию
    // } else if (inputValue < 1970) {
    //   inputValue = 1970; // не допустим отрицательные значения
    // } else if (inputValue > 2024) {
    //   inputValue = 2024; // не допустим значения больше 100
    // }
   const newValue = {...value,[name]:inputValue}
    setValue(newValue);    
  };

const [min,max] = startValue(typeRange);

// console.log (startValue(typeRange))
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
        <input
          min={min}
          max={max}          
          step={1}
          type="range"
          id="from"
          name="from"
          className={styles.carYearLeftAddBrandt}
          value={value.from}
          onChange={handleRangeChange}
          /> 
          <input
            min={min}
            max={max}
            step={1}
            type="range"
            id="to"
            name="to"
            className={styles.carYearRightAddBrand} 
            value={value.to}
            onChange={handleRangeChange}                      
          />
      </div>
    </>
    
    );    
  };

  export default RangeSlider;
  
  