// import { CardItem } from "components/CardItem";
import React from "react";
import styles from "./SearchingResults.module.scss"

import { useSelector } from 'react-redux';
import { getFiltredCars } from 'redux/filter/selectors';

// import { ICar } from "types/IСar";
import { SearchingCard } from "./SearchingCard/SearchingCard";

// interface Props {
//     cars?: ICar[] | [];
// }


const SearchingResults: React.FC = () => {
    const adverts = useSelector(getFiltredCars)

  return (
    <div className={styles.container}>
       {adverts.map((advert)=><SearchingCard key={advert.id} car={advert}/>)}  
    </div>
    
  )
}

export default SearchingResults;

