import React, { useEffect, useState } from 'react';
import './GoToTop.scss';
import { FaArrowUp } from 'react-icons/fa6';

const GoToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const listenToScroll = () => {
        const heightToHidden = 500;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop; // визначення позиції прокрутки сторінки

        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll);
    }, []);

    return (
        <div className='goToTop'>
            {isVisible && (
                <div className='top-btn' onClick={goToBtn}>
                    <FaArrowUp className='top-btn--icon'></FaArrowUp>
                </div>
            )}
        </div>
    );
};

export default GoToTop;
