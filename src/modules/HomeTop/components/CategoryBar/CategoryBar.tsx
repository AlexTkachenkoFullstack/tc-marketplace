import { useEffect, useRef, useState } from 'react';
import scrollRight from 'assets/icons/arrow_right.svg';
import scrollLeft from 'assets/icons/arrow_back.svg';
import styles from './CategoryBar.module.scss';

interface Props {
  categories: string[];
  handleSelect:(category:string)=>void;
  selectedCategory:string
}

export const CategoryBar: React.FC<Props> = ({ categories, handleSelect, selectedCategory }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        setShowLeftScrollButton(container.scrollLeft > 0);
        setShowRightScrollButton(
          container.scrollWidth > (container.clientWidth + container.scrollLeft)
        );
      };

      const handleResize = () => {
        handleScroll();
      }

      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };

    }
  }, []);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200;
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200;
    }
  };

  return (
  <div className={styles.container}>
    {showLeftScrollButton &&
      <button className={styles.container__scroll_left} onClick={handleScrollLeft}>
        <img src={scrollLeft} alt="scroll right" />
      </button>
    }

    <div className={styles.category_bar} ref={containerRef}>
      {categories.map(category => (
        <button
          className={`${styles.category} ${selectedCategory === category ? styles.selected : ''}`}
          key={category}
          onClick={() => handleSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>

      {showRightScrollButton &&
      <button className={styles.container__scroll_right} onClick={handleScrollRight}>
        <img src={scrollRight} alt="scroll right" />
      </button>
      }
  </div>
  );
};
