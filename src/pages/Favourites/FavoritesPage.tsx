import { FC } from 'react';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
    // const favoritesProducts = useAppSelector(selectFavorites);

    // const productsCount = favoritesProducts.length;

    return (
        <div className={`${styles.Container}`}>
            {/* <div className={styles.Container__Top}>
        <Breadcrumbs />
      </div>
      <h1 className={styles.title}>Favorites</h1>
      <h3 className={styles.text}>{`${productsCount} items`}</h3>

      {!productsCount ? (
        <h2 className={styles.emptyFavorite}>
          There are no items in your favorite 🧐
        </h2>
      ) : (
        <ProductsList
          products={favoritesProducts}
          className={styles.products}
        />
      )} */}

        </div>
    );
};
