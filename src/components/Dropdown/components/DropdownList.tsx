import React from 'react';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import styles from './DropdownList.module.scss';
import {
  DropdownInfoOption,
  DropdownNoMatchOption,
  DropdownOption,
  DropdownSelectAllOption,
} from './DropdownOptions';
type Props = {
  checkedValue: string[];
  checkboxAllowed: boolean | undefined;
  filterValue: string;
  options: string[];
  options1: any;
  changeOption: (option: string) => void;
  checkboxHandler: (option: string) => void;
  allOptionsLabel?: string;
  titleName?: string[];
};

export default function DropdownList(props: Props) {
  const {
    checkedValue,
    filterValue,
    checkboxAllowed,
    options,
    titleName,
    options1,
  } = props;

  const filterOptionsFunc = (text: string) => {
    if (filterValue.length === 0) return true;

    const translit = cyrillicToTranslit();
    const translitUa = cyrillicToTranslit({ preset: 'uk' });

    const optionValue = text.toLowerCase();
    const checkValue = filterValue.toLowerCase().trim();

    const cyrillicPattern = /^[\u0400-\u04FF]+$/;

    if (cyrillicPattern.test(filterValue)) {
      if (optionValue.includes(checkValue)) return true;
      if (optionValue.includes(translitUa.transform(checkValue))) return true;
      return optionValue.includes(translit.transform(checkValue));
    }
    if (optionValue.includes(translit.reverse(checkValue))) return true;
    if (optionValue.includes(translitUa.reverse(checkValue))) return true;
    return optionValue.includes(checkValue);
  };

  const filtredItems = options1?.map((option: any) =>
    option.cities
      ? option.cities.map((item: any) => item.city).filter(filterOptionsFunc)
      : option.models.map((item: any) => item.model).filter(filterOptionsFunc),
  );
  const filtredItem = options?.filter(filterOptionsFunc);

  const filtredOptions = filtredItems || filtredItem;
  return (
    <ul className={styles.list}>
      {checkboxAllowed && !!filtredOptions.length && (
        <>
          <DropdownInfoOption text="Обрані:" />
          <DropdownSelectAllOption {...props} />
          {checkedValue.map(currentOption => (
            <DropdownOption
              key={currentOption}
              {...props}
              currentOption={currentOption}
            />
          ))}
        </>
      )}
      {!filtredOptions.every(Array.isArray) &&
        checkboxAllowed &&
        !!filtredOptions.length && <DropdownInfoOption text={'Весь список:'} />}
      {!filtredOptions.every(Array.isArray) ? (
        filtredOptions.length === 0 ? (
          <DropdownNoMatchOption />
        ) : (
          filtredOptions
            .filter(
              (currentOption: any) => !checkedValue.includes(currentOption),
            )
            .map((currentOption: any) => (
              <DropdownOption
                {...props}
                currentOption={currentOption}
                key={currentOption.toLowerCase().trim().replaceAll(' ', '_')}
              />
            ))
        )
      ) : filtredOptions.length === 0 ? (
        <DropdownNoMatchOption />
      ) : (
        <>
          {filtredOptions.map((item: any, i: any) => {
            return (
              <>
                {
                  <DropdownInfoOption
                  key={item+i}
                    text={
                      titleName && titleName.length > 0
                        ? titleName[i]
                        : 'Весь список:'
                    }
                  />
                }
                {item
                  .filter(
                    (currentOption: any) =>
                      !checkedValue.includes(currentOption),
                  )
                  .map((currentOption: any) => (
                    <>
                      <DropdownOption
                        {...props}
                        currentOption={currentOption}
                        key={currentOption
                          .toLowerCase()
                          .trim()
                          .replaceAll(' ', '_')}
                      />
                    </>
                  ))}
              </>
            );
          })}
        </>
      )}
    </ul>
  );
}
