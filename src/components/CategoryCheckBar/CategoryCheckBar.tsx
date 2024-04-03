import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CategoryCheckBar.module.scss';

interface TransportObject {
  transportColorId: number;
  transportColor: string;
  hex: string;
}

interface Props {
  resetValue?: boolean;
  isShow?: boolean | { [key: string]: boolean };
  color?: string;
  categories?: string[];
  transportColor?: TransportObject[];
  handleSelect: (category: string[]) => void;
  selectedCategory?: string | string[];
}

export const CategoryCheckBar: React.FC<Props> = ({
  color,
  isShow,
  categories,
  resetValue,
  handleSelect,
  transportColor,
  selectedCategory,
}) => {
  const initialCheckedItems = useMemo(() => {
    if (selectedCategory) {
      return Array.isArray(selectedCategory)
        ? selectedCategory.reduce((acc: any, curr: string) => ({ ...acc, [curr]: true }), {})
        : { [selectedCategory]: true };
    } else if (categories) {
      return categories.reduce((acc, curr) => ({ ...acc, [curr]: false }), {});
    }
    return {};
  }, [categories, selectedCategory]);
  const location = useLocation();
  const isAdvancedSearchPage = location.pathname === '/advanced-search';
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    initialCheckedItems,
  );

  useEffect(() => {
    if (!resetValue) {
      return;
    }
    console.log('resetValue :>> ', resetValue);
    setCheckedItems(initialCheckedItems);
  },[resetValue,initialCheckedItems]);

  const handleCheckboxChange = (category: string) => {
    const newCheckedItems = {
      ...checkedItems,
      [category]: !checkedItems[category],
    };
    setCheckedItems(newCheckedItems);
    const updatedCategoryType = Object.keys(newCheckedItems).filter(
      key => newCheckedItems[key],
    );
    handleSelect(updatedCategoryType);
  };

  return (
    <div
      className={`${styles.container} ${
        isAdvancedSearchPage ? styles.advanced_search_container : ''
      } `}
    >
      <div
        className={`${styles.category_bar} ${
          isAdvancedSearchPage ? styles.advanced_search_category_bar : ''
        }`}
      >
        {color && transportColor
          ? transportColor.slice(0, isShow ? 12 : 6).map(category => (
              <label
                className={`${styles.category} ${
                  isAdvancedSearchPage ? styles.advanced_search_category : ''
                } ${
                  selectedCategory &&
                  selectedCategory.includes(category.transportColor) &&
                  checkedItems[category.transportColor]
                    ? styles.selected
                    : ''
                }`}
                key={category.transportColorId}
              >
                <span
                  style={{
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    backgroundColor: category.hex,
                    width: 16,
                    height: 16,
                    borderRadius: 50,
                    border: 'none',
                    marginRight: 8,
                  }}
                />
                {category.transportColor}
                <input
                  className={styles.hidden_checkbox}
                  type="checkbox"
                  checked={checkedItems[category.transportColor]}
                  onChange={() => handleCheckboxChange(category.transportColor)}
                />
              </label>
            ))
          : categories &&
            categories.map(category => (
              <label
                className={`${styles.category} ${
                  isAdvancedSearchPage ? styles.advanced_search_category : ''
                } ${
                  selectedCategory &&
                  selectedCategory.includes(category) &&
                  checkedItems[category]
                    ? styles.selected
                    : ''
                }`}
                key={category}
              >
                {category}
                <input
                  className={styles.hidden_checkbox}
                  type="checkbox"
                  checked={checkedItems[category]}
                  onChange={() => handleCheckboxChange(category)}
                />
              </label>
            ))}
      </div>
    </div>
  );
};
