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
  selectedValue?: { from: number; to: number };
  newStyle?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  setObjectValue,
  typeRange,
  resetValue,
  selectedValue,
  newStyle,
}) => {
  const [value, setValue] = useState<SliderValue>({ from: 0, to: 0 });
  const [isMounted, setisMounted] = useState(false);
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

  useEffect(() => {
    if (!isMounted) {
      if (selectedValue) {
        setValue({ from: selectedValue.from, to: selectedValue.to });
        setObjectValue({ from: selectedValue.from, to: selectedValue.to });
      }
    }
    setisMounted(true);
  }, [isMounted, selectedValue, setObjectValue]);

  return (
    <div>
      <div
        className={`${styles.inputBlokResult} ${newStyle && styles[newStyle]}`}
      >
        <input
          type="text"
          id="from"
          name="from"
          className={`${styles.priceLeft} ${newStyle && styles[newStyle]}`}
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
          className={`${styles.priceRight} ${newStyle && styles[newStyle]}`}
          value={
            typeRange === 'engineDisplacement' ? value.to.toFixed(1) : value.to
          } // Виводимо значення з однією десятковою цифрою
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles.inputBlokRange} ${
          newStyle && styles[newStyle]
        }`}
      >
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
