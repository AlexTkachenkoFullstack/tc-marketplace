/* eslint-disable max-len */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { scrollToTop } from '../../helpers/scrollToTop';

import styles from './GoToTopButton.module.scss';

export const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollThreshold = 100;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const documentHeight = document.documentElement.scrollHeight;

      const footerHeight = 100;
      const isFooterVisible
        = scrollY + window.innerHeight < documentHeight - footerHeight;

      setShowButton(scrollY > scrollThreshold && isFooterVisible);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      role="button"
      className={cn(styles.Button, {
        [styles.show]: showButton,
      })}
      onClick={scrollToTop}
    >
    </div>
  );
};
