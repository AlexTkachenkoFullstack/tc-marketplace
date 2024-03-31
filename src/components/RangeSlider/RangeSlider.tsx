import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './newStyles.css';
import styles from './RangeSlider.module.scss';
import { yearNow } from 'utils/yearNow';

interface SliderValue {
  from: number;
  to: number;
}

interface RangeSliderProps {
  setObjectValue: React.Dispatch<React.SetStateAction<SliderValue>>;
  typeRange: string;
  resetValue?: boolean;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  setObjectValue,
  typeRange,
  resetValue,
}) => {
  const [value, setValue] = useState<SliderValue>({ from: 0, to: 0 });
  useEffect(() => {
    if (!resetValue) {
      return;
    }
    const [min, max] = startValue(typeRange);
    if (min !== undefined && max !== undefined) {
      setValue({ from: min, to: max });
      setObjectValue({ from: min, to: max });
    }
  }, [typeRange, setObjectValue, resetValue]);

  useEffect(() => {
    const [min, max] = startValue(typeRange);
    if (min !== undefined && max !== undefined) {
      setValue({ from: min, to: max });
      setObjectValue({ from: min, to: max });
    }
  }, [typeRange, setObjectValue]);

  function startValue(typeRange: string): [number, number] {
    switch (typeRange) {
      case 'price':
        return [100, 1000000];
      case 'year':
        return [1970, yearNow()];
      case 'mileage':
        return [0, 1000000];
      case 'engineDisplacement':
        return [0, 20];
      case 'enginePower':
        return [0, 1000];
      case 'numberOfDoors':
        return [2, 5];
      case 'numberOfSeats':
        return [2, 18];
      default:
        return [0, 0];
    }
  }

  const [min, max] = startValue(typeRange);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      const newValue = { ...value };
      if (name === 'from') {
        newValue.from = inputValue;
      }
      if (name === 'to') {
        newValue.to = inputValue;
      }
      if (newValue.from < min || newValue.from > max) {
        newValue.from = min;
      }
      if (newValue.to > max) {
        newValue.to = max;
      }
      if (newValue.from > newValue.to) {
        newValue.to = newValue.from;
      }
      setValue(newValue);
      setObjectValue(newValue);
    }
  };

  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue({ from: newValue, to: newValue });
      setObjectValue({ from: newValue, to: newValue });
    } else {
      setValue({ from: newValue[0], to: newValue[1] });
      setObjectValue({ from: newValue[0], to: newValue[1] });
    }
  };

  return (
    <div>
      <div className={styles.inputBlokResult}>
        <input
          type="text"
          id="from"
          name="from"
          className={styles.priceLeft}
          value={
            typeRange === 'engineDisplacement'
              ? value.from.toFixed(1)
              : value.from
          } // Виводимо значення з однією десятковою цифрою
          onChange={handleInputChange}
        />
        <span className={styles.centralDivider}></span>
        <input
          type="text"
          id="to"
          name="to"
          className={styles.priceRight}
          value={
            typeRange === 'engineDisplacement' ? value.to.toFixed(1) : value.to
          } // Виводимо значення з однією десятковою цифрою
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputBlokRange}>
        <Slider
          range
          className="newStyles"
          min={min}
          max={max}
          value={[value.from, value.to]}
          onChange={handleSliderChange}
          allowCross={false}
          step={typeRange === 'engineDisplacement' ? 0.1 : 1} // Задаємо крок для слайдера
        />
      </div>
    </div>
  );
};

export default RangeSlider;

// import React, { useState, useEffect } from 'react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import './newStyles.css';
// import styles from './RangeSlider.module.scss';

// interface SliderValue {
//   from: number;
//   to: number;
// }

// interface RangeSliderProps {
//   setObjectValue: React.Dispatch<
//     React.SetStateAction<{ from: number; to: number }>
//   >;
//   typeRange: string;
// }

// const RangeSlider: React.FC<RangeSliderProps> = ({
//   setObjectValue,
//   typeRange,
// }) => {
//   const [value, setValue] = useState<SliderValue>({ from: 0, to: 0 }); // начальное значение

//   useEffect(() => {
//     const [min, max] = startValue(typeRange);
//     if (min !== undefined && max !== undefined) {
//       setValue({ from: min, to: max }); // установить начальные значения при загрузке страницы
//       setObjectValue({ from: min, to: max });
//     }
//   }, [typeRange, setObjectValue]);
//   function startValue(typeRange: string) {
//     let min;
//     let max;
//     switch (typeRange) {
//       case 'price':
//         min = 1000;
//         max = 1000000;
//         break;
//       case 'year':
//         min = 1970;
//         max = 2024;
//         break;
//       case 'mileage':
//         min = 10;
//         max = 1000000;
//         break;
//       case 'engineDisplacement':
//         min = 0;
//         max = 20;
//         break;
//       case 'enginePower':
//         min = 0;
//         max = 1000;
//         break;
//       case 'numberOfDoors':
//         min = 2;
//         max = 5;
//         break;
//       case 'numberOfSeats':
//         min = 2;
//         max = 7;
//         break;
//     }
//     return [min, max];
//   }
//   const [min, max] = startValue(typeRange);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const [min, max] = startValue(typeRange);
//     const newValue = { ...value };
//     if (min && max) {
//       const name = event.target.name;
//       let inputValue = parseInt(event.target.value);
//       if (isNaN(inputValue)) {
//         return;
//       }
//       if (name === 'from') {
//         newValue.from = inputValue;
//       }
//       if (name === 'to') {
//         newValue.to = inputValue;
//       }
//       if (newValue.from < min || newValue.from > max) {
//         newValue.from = min;
//       }
//       if (newValue.to > max) {
//         newValue.to = max;
//       }
//       if (newValue.from > newValue.to) {
//         newValue.to = newValue.from;
//       }

//       setValue(newValue);
//       setObjectValue(newValue);
//     }
//   };

//   const handleSliderChange = (newValue: number | number[]) => {
//     if (typeof newValue === 'number') {
//       // Если newValue - число, это означает, что один из бегунков слайдера был передвинут
//       setValue({ from: newValue, to: newValue });
//       setObjectValue({ from: newValue, to: newValue });
//     } else {
//       // Если newValue - массив чисел, это означает, что диапазон был изменен
//       setValue({ from: newValue[0], to: newValue[1] });
//       setObjectValue({ from: newValue[0], to: newValue[1] });
//     }
//   };

//   return (
//     <div>
//       <div className={styles.inputBlokResult}>
//         <input
//           type="text"
//           id="from"
//           name="from"
//           className={styles.priceLeft}
//           value={value.from}
//           onChange={handleInputChange}
//         />{' '}
//         <span className={styles.centralDivider}></span>
//         <input
//           type="text"
//           id="to"
//           name="to"
//           className={styles.priceRight}
//           value={value.to}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className={styles.inputBlokRange}>
//         <Slider
//           range
//           className="newStyles"
//           min={min}
//           max={max}
//           value={[value.from, value.to]}
//           onChange={handleSliderChange}
//           allowCross={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default RangeSlider;
