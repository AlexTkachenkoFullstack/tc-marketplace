import styles from './CategoryBar.module.scss';
// import scrollRight from '../../assets/icons/arrow_right.svg';
// import scrollLeft from '../../assets/icons/arrow_back.svg';
import {
  //  useEffect,
   useRef,
    // useState 
  } from 'react';
import { useLocation } from 'react-router-dom';
interface TransportObject {
  transportColorId: number;
  transportColor: string;
  hex: string;
}

interface Props {
  isShow?: boolean | { [key: string]: boolean };
  color?: string;
  categories?: string[];
  transportColor?: TransportObject[];
  handleSelect: (category: string) => void;
  selectedCategory?: string;
  selectedStyle?: string;
  chips?:string,
}

export const CategoryBar: React.FC<Props> = ({
  isShow,
  chips,
  color,
  transportColor,
  categories,
  handleSelect,
  selectedCategory,
  selectedStyle,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  // const [showRightScrollButton, setShowRightScrollButton] = useState(true);
  const location = useLocation();
  const isAdvancedSearchPage = location.pathname === '/advanced-search';
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     const handleScroll = () => {
  //       setShowLeftScrollButton(container.scrollLeft > 0);
  //       setShowRightScrollButton(
  //         container.scrollWidth > container.clientWidth + container.scrollLeft,
  //       );
  //     };

  //     const handleResize = () => {
  //       handleScroll();
  //     };

  //     container.addEventListener('scroll', handleScroll);
  //     window.addEventListener('resize', handleResize);

  //     return () => {
  //       container.removeEventListener('scroll', handleScroll);
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  // }, []);

  // const handleScrollRight = () => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollLeft += 200;
  //   }
  // };

  // const handleScrollLeft = () => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollLeft -= 200;
  //   }
  // };

  return (
    <div
      className={`${styles.container} ${
        isAdvancedSearchPage ? styles.advanced_search_container : ''
      } ${selectedStyle === 'userPageStyle' ? styles.userPageContainer : null}`}
    >
      {/* {showLeftScrollButton && (
        <button
          className={`${styles.container__scroll_left} ${
            isAdvancedSearchPage ? styles.btn : ''
          } ${
            selectedStyle === 'userPageStyle' ? styles.userPageScrollLeft : null
          }  `}
          onClick={handleScrollLeft}
        >
          <img src={scrollLeft} alt="scroll right" />
        </button>
      )} */}

      <div
        className={`${styles.category_bar} ${
          isAdvancedSearchPage ? styles.advanced_search_category_bar : ''
        } ${selectedStyle && styles[selectedStyle]}`}
        ref={containerRef}
      >
        {color && transportColor
          ? transportColor.slice(0, isShow ? 12 : 6).map(category => (
              <button
                className={`${styles.category}
                 ${isAdvancedSearchPage ? styles.advanced_search_category : ''} 
                 ${
                   selectedStyle === 'userPageStyle'
                     ? styles.userPageCategory
                     : null
                 }               
                ${
                  selectedCategory === category.transportColor &&
                  chips === 'chips'
                    ? styles.selected
                    : ''
                } `}
                key={category.transportColorId}
                onClick={() => handleSelect(category.transportColor)}
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
                ></span>
                {category.transportColor}
              </button>
            ))
          : categories &&
            categories.map(category => (
              <button
                className={`${styles.category} ${
                  isAdvancedSearchPage ? styles.advanced_search_category : ''
                } 
                 ${
                   selectedStyle === 'userPageStyle'
                     ? styles.userPageCategory
                     : null
                 } ${
                  chips === 'chips'
                    ? selectedCategory === category
                      ? styles.selected
                      : ''
                    : selectedCategory === category
                    ? styles.selected_category
                    : ''
                }`}
                key={category}
                onClick={() => handleSelect(category)}
              >
                {category}
              </button>
            ))}
      </div>

      {/* {showRightScrollButton && (
        <button
          className={`${styles.container__scroll_right} ${
            isAdvancedSearchPage ? styles.btn : ''
          } ${
            selectedStyle === 'userPageStyle'
              ? styles.userPageScrollRight
              : null
          }  `}
          onClick={handleScrollRight}
        >
          <img src={scrollRight} alt="scroll right" />
        </button>
      )} */}
    </div>
  );
};
