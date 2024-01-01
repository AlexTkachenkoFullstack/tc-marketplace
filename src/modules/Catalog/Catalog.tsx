import React, { useEffect, useState } from 'react';
import styles from './Catalog.module.scss'
import CatalogCard from 'components/CatalogCard/CatalogCard';
import axios from 'axios';
import { ICar } from 'types';
import { CommonBtn } from 'UI/CommonBtn';

const Catalog: React.FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.pawo.space/api/v1/catalog/search/page/0/limit/${6 * currentPage}/?transportTypeId=1`);
        setCars(response.data);
        if(cars.length > 11) {
          setIsBtnVisible(false)
        } else {
          setIsBtnVisible(true)
        }
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };

    fetchData();
  }, [currentPage, cars.length])

  return (
    <div className={styles.catalogContainer}>
      {cars.map((car) => <CatalogCard key={car.id} car={car} />)}
      {isBtnVisible && (
       <CommonBtn
          className={styles.loadBtn}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Завантажити більше
        </CommonBtn>
      )}
    </div>
  );
};

export default Catalog;
