import { Dropdown } from 'components/Dropdown/Dropdown';
import { IBrand, IModel, IRegion } from 'types/index';
import styles from './SelectBar.module.scss';

type Props = {
  brands: IBrand[],
  carMark: string | string[],
  setCarMark: React.Dispatch<React.SetStateAction<string | string[]>>,
  models: IModel[],
  carModel: string | string[],
  setCarModel: React.Dispatch<React.SetStateAction<string | string[]>>,
  regions: IRegion[],
  selectedRegions:string | string[],
  setSelectedRegions: React.Dispatch<React.SetStateAction<string | string[]>>,
}

export const SelectBar = (props: Props) => {
  const {
    brands,
    carMark,
    setCarMark,
    models,
    carModel,
    setCarModel,
    regions,
    selectedRegions,
    setSelectedRegions,
  } = props;

  return (
    <div className={styles.select_bar}>

        <Dropdown
            options={[...brands.map((brand) => brand.brand)].sort((a, b) => a.localeCompare(b))}
            label='Марка'
            startValue='Марка'
            option={carMark}
            setOption={setCarMark}
        />

        <Dropdown
            options={
                carMark!=='Всі марки'
                ? models.map(item => item.model)
                : []
            }
            label='Модель'
            startValue='Модель'
            checkboxAllowed
            allOptionsLabel='Всі моделі'
            option={carModel}
            setOption={setCarModel}
            carMark={carMark}

            />

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
  )
};
