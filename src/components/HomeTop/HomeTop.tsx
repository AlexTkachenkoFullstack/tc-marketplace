import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { useEffect, useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getFilterBrands, getFilterModels, getFilterRegions, getFilterTypes } from 'redux/filter/selectors';
import { fetchBrands, fetchModels, fetchRegions, fetchTypes } from 'redux/filter/operations';
import { IRegion } from 'types/IRegion';
import { IType } from 'types/IType';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';

export const HomeTop = () => {
    const dispatch = useAppDispatch();
    const regions: IRegion[] = useAppSelector(getFilterRegions)
    const categories: IType[] = useAppSelector(getFilterTypes)
    const brands: IBrand[] = useAppSelector(getFilterBrands)
    const models: IModel[] = useAppSelector(getFilterModels)
    const [selectedCategory, setSelectedCategory] = useState<string>('Легкові')
    // select state for dropdown
    const [carMark, setCarMark] = useState<string | string[]>('Всі марки')
    const [carModel, setCarModels] = useState<string | string[]>('Всі моделі')
    const [selectedRegions, setSelectedRegions] = useState<string | string[]>('Всі регіон')
    //    
    const [isModelDissabled, setIsModelDissabled] = useState(false);
    useEffect(() => {
        setIsModelDissabled(false)
        dispatch(fetchRegions())
        dispatch(fetchTypes())
        // dispatch(fetchBrands())
    }, [dispatch])

    const handleSelectCategory = (category: string) => {
        // setIsModelDissabled(false)
        setSelectedCategory(category);
    }

    useEffect(() => {
        const type = categories.find(item => item.type === selectedCategory);
        if (type) {
            dispatch(fetchBrands(type.typeId))
        }
    }, [categories, dispatch, selectedCategory])

    useEffect(() => {
        const type = categories.find(item => item.type === selectedCategory);
        const brand = brands.find(item => item.brand === 'Audi')
        if (type && brand) {
            dispatch(fetchModels({ transportTypeId: type?.typeId, transportBrandId: brand?.brandId }))
            // setIsModelDissabled(true)
        }
    }, [brands, categories, dispatch, selectedCategory])


    return (
        <div className={styles.homeTop}>
            <div className={styles.container}>
                <div className={styles.centered_container}>
                    <h2 className={styles.title}>
                        Title
                    </h2>

                    <CategoryBar
                        categories={categories.map((category) => category.type)}
                        handleSelect={handleSelectCategory}
                        selectedCategory={selectedCategory}
                    />

                    <div className={styles.container_bottom}>
                        <div className={styles.select_bar}>


                            <Dropdown
                                options={[...brands.map((brand) => brand.brand)].sort((a, b) => a.localeCompare(b))}
                                label='Марка'
                                startValue='Всі моделі'
                                option={carMark}
                                setOption={setCarMark}
                            />

                            <Dropdown
                                options={models.map(item => item.model)}
                                label='Модель'
                                startValue='Модель'
                                checkboxAllowed
                                isDissabled={isModelDissabled}
                                allOptionsLabel='Всі марки'
                                option={carModel}
                                setOption={setCarModels} />

                            <Dropdown
                                options={regions.map((region) => region.region)}
                                label='Регіон'
                                startValue='Регіон'
                                checkboxAllowed
                                allOptionsLabel='Вся Україна'
                                option={selectedRegions}
                                setOption={setSelectedRegions}

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
        </div>
    );
};
