import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { useEffect, useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getFilterBrands, getFilterRegions, getFilterTypes } from 'redux/filter/selectors';
import { fetchBrands, fetchRegions, fetchTypes } from 'redux/filter/operations';
import { IRegion } from 'types/IRegion';
import { IType } from 'types/IType';
import { IBrand } from 'types/IBrand';

const models = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const brands = ['Toyota', 'Ford', 'BMW', 'Audi', 'Lexus'];
// const categories = ['Всі', 'Легкові', 'Мотоцикли', 'Електротранспорт', 'Причепи', 'Вантажівки', 'Водний транспорт'];

export const HomeTop = () => {
    const dispatch = useAppDispatch();
    const regions: IRegion[] = useAppSelector(getFilterRegions)
    const categories: IType[] = useAppSelector(getFilterTypes)
    const brands: IBrand[] = useAppSelector(getFilterBrands)
    const [selectedCategory, setSelectedCategory] = useState<string>('легкові');
    // const [active, setActive] = useState(false);
    useEffect(() => {
        dispatch(fetchRegions())
        dispatch(fetchTypes())
        dispatch(fetchBrands())
    }, [dispatch])
    console.log(selectedCategory)

    return (
        <div className={styles.homeTop}>
            <div className={styles.container}>
            <div className={styles.centered_container}> 
                <h2 className={styles.title}>
                    Title
                </h2>
               
                <CategoryBar
                    categories={categories.map((category) => category.type)}
                    handleSelect={setSelectedCategory}
                />

                <div className={styles.container_bottom}>
                    <div className={styles.select_bar}>


                        <Dropdown
                            options={[...brands.map((brand) => brand.brand)].sort((a, b) => a.localeCompare(b))}
                            label='Марка'
                            startValue='Марка'
                        />

                        <Dropdown
                            options={models}
                            label='Модель'
                            startValue='Модель'
                            checkboxAllowed
                        // setActive={setActive}
                        />

                        <Dropdown
                            options={regions.map((region) => region.region)}
                            label='Регіон'
                            startValue='Регіон'
                            checkboxAllowed
                        />
                    </div>

                    <div className={styles.search}>
                        <button className={styles.search_button}>
                            <span className={styles.search_button_text}>Шукати</span>
                            <img src={arrow} alt="search" />
                        </button>
                        <button className={styles.search_more}>Розширений пошук</button>
                    </div>
                </div>

            </div>

            </div>
            {/* <GoToTopButton /> */}
        </div>
    );
};
