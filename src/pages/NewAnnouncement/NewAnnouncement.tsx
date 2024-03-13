import React, { useEffect, useState } from 'react';
import styles from './NewAnnouncement.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterCitys,
  getFilterModels,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import { IType } from 'types/IType';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ReactComponent as Replay } from '../../assets/icons/replay.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Add } from '../../assets/icons/add.svg';
import { ReactComponent as Arrowdown } from '../../assets/icons/more-down.svg';
import { ReactComponent as Arrowup } from '../../assets/icons/more-up.svg';
import { getCarTypeParam } from 'services/services';
import { IRegion } from 'types/IRegion';
import {
  fetchBrands,
  fetchCity,
  fetchModels,
  fetchRegions,
  fetchTypes,
} from 'redux/filter/operations';
import { ISearchParams } from 'types/ISearchParam';
import { ICities } from 'types/ICities';

interface BlocksVisibilityState {
  [key: string]: boolean;
}
interface CityItem {
  cityId: number;
  city: string;
}

export const NewAnnouncement: React.FC = () => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<BlocksVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialBlocksVisibility(false)
      : getInitialBlocksVisibility(true);
  });

  // const [isShow, setIsShow] = useState<ButtonVisibilityState>(() => {
  //   return getWindowWidth() < 767
  //     ? getInitialButtonVisibility(false)
  //     : getInitialButtonVisibility(true);
  // });
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const maxDigits = 12;
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(
    'Вся Україна',
  );

  const [selectedCity, setSelectedCity] = useState<string | string[]>('Місто');
  // response(catalog) get-param
  const [data, setData] = useState<any>([]);
  const [selectedDriveType, setSelectedDriveType] = useState<string | string[]>(
    'Привід',
  );
  const [selectedTransmission, setSelectedTransmission] = useState<
    string | string[]
  >('Коробка передач');
  const [selectedFuelType, setSelectedFuelType] = useState<string | string[]>(
    'Тип палива',
  );
  const [selectedBodyType, setSelectedBodyType] = useState<string | string[]>(
    'Тип кузову',
  );
  const [selectedColor, setSelectedColor] = useState<string | string[]>(
    'Колір',
  );
  const [selectedProducingCountry, setSelectedProducingCountry] = useState<
    string | string[]
  >('Країна');
  const [selectedWheelConfiguration, setSelectedWheelConfiguration] = useState<
    string | string[]
  >('Конфігурація коліс');
  const [selectedAxle, setSelectedAxle] = useState<string | string[]>(
    'Кількість осей',
  );
  const [selectedCondition, setSelectedCondition] = useState<string | string[]>(
    'Технічний стан',
  );
  const [selectedOption, setSelectedOption] = useState<boolean>();
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string>('Легкові');
  const [typeCategory, setTypeCategory] = useState<string | string[]>('Тип');
  const [carBrand, setCarBrand] = useState<string | string[]>('Бренд');
  const [carModel, setCarModel] = useState<string | string[]>('Всі моделі');
  const typeCars: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterModels);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICities[] = useAppSelector(getFilterCitys);

  const city: CityItem[] = [];
  if (cities.length > 0) {
    cities?.forEach((item: ICities) => {
      city.push(...item.cities);
    });
  }

  //  response catalog/get-param/id
  const bodyTypes = data?.bodyTypeDTOS;
  const fuel = data?.fuelTypeDTOS;
  const transmission = data?.transmissionDTOS;
  const transportColor = data?.transportColorDTOS;
  const driveType = data?.driveTypeDTOS;
  const transportCondition = data?.transportConditionDTOS;
  const numberAxles = data?.numberAxlesDTOS;
  const wheelConfiguration = data?.wheelConfigurationDTOS;
  const producingCountry = data?.producingCountryDTOS;

  console.log('inputPhone :>> ', inputPhone);
  useEffect(() => {
    if (typeCars.length > 0) {
      return;
    }
    dispatch(fetchTypes());
    if (regions.length > 0) {
      return;
    }
    dispatch(fetchRegions());
  }, [dispatch, typeCars.length, regions.length]);

  useEffect(() => {
    const type = typeCars.find(item => item.type === typeCategory);
    type && setTransportTypeId(type?.typeId);
    if (type) {
      dispatch(fetchBrands(type.typeId));
    }
  }, [typeCars, dispatch, typeCategory]);

  //get-params transportTypeId
  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      const data = await getCarTypeParam(`${transportTypeId}`);
      setData(data);
    }
    getCarTypeParams();
  }, [transportTypeId]);

  useEffect(() => {
    if (selectedRegions && regions) {
      const region = regions.find(item => item.region === selectedRegions);
      const regionId = region?.regionId;
      if (regionId !== null && regionId !== undefined) {
        const searchParams: Pick<ISearchParams, 'regionId'> = {
          regionId: [regionId],
        };
        const searchConfig = {
          searchParams,
        };

        dispatch(fetchCity(searchConfig));
      }
    }
  }, [selectedRegions, dispatch, regions]);
  useEffect(() => {
    const type = typeCars.find(item => item.type === typeCategory);
    const brand = brands.find(item => item.brand === carBrand);
    if (type && brand) {
      // setBrandId([brand?.brandId]);
      dispatch(
        fetchModels({
          transportTypeId: type?.typeId,
          transportBrandId: brand?.brandId,
        }),
      );
    }
  }, [brands, carBrand, typeCars, dispatch, typeCategory]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(prevState => {
      return getWindowWidth() < 767
        ? getInitialBlocksVisibility(false)
        : getInitialBlocksVisibility(true);
    });
  }, [windowWidth]);

  function getWindowWidth() {
    return window.innerWidth;
  }
  function getInitialBlocksVisibility(isVisible: boolean) {
    const initialBlocksVisibility: BlocksVisibilityState = {};
    for (let i = 1; i <= 25; i++) {
      initialBlocksVisibility[`block${i}`] = isVisible;
    }
    return initialBlocksVisibility;
  }
  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      const data = await getCarTypeParam(`${transportTypeId}`);
      setData(data);
    }
    getCarTypeParams();
  }, [transportTypeId]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'Так';
    setSelectedOption(value);
  };
  const handleMobileBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsOpen(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  const handleInputPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\+[0-9]*$/.test(value) && value.length <= maxDigits + 1) {
      setInputPhone(value);
    }
  };
  const remainingDigits = maxDigits - (inputPhone.length - 1);
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;

    if (value.length <= 100) {
      setTextValue(value);
    }
  };
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Додавання оголошення</h1>
        <h2 className={styles.title}>Ваші контактні дані</h2>

        <div className={styles.boxPhone}>
          <div className={styles.boxtitle}>
            <h2 className={styles.titlePhone}>Номер телефону</h2>
            <div
              className={`${styles.mobileButton}  ${
                getWindowWidth() >= 768 ? styles.hide : ''
              }`}
              onClick={() => handleMobileBtnIsOpen('block1')}
            >
              {isOpen.block1 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div>
          </div>
          {isOpen.block1 && (
            <div className={styles.wrapper_item}>
              <div className={styles.item}>
                <input
                  className={styles.inputPhone}
                  type="text"
                  pattern="\+[0-9]*"
                  placeholder={`+380`}
                  maxLength={maxDigits + 1}
                  value={inputPhone}
                  title={`${remainingDigits} цифр осталось`}
                  onChange={handleInputPhone}
                  onFocus={() => setIsInputActive(true)}
                  onBlur={() => setIsInputActive(false)}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.blocTitleFoto}>
          <div className={styles.boxTitleFoto}>
            <h2 className={styles.titleAddFoto}>Додайте фото</h2>
            <button className={styles.addMore}>Додати більше</button>
          </div>
          <p className={styles.titleHelpText}>
            Обов’язково додайте мінімум одне фото
          </p>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgCard}>
            <div className={styles.box_input}>
              <input type="checkbox" id="foto1" />
              <label htmlFor="foto1" className={styles.label_title}>
                Головне
              </label>
            </div>
            <button className={styles.replay_btn}>
              <Replay />
            </button>
            <button className={styles.close_btn}>
              <Close />
            </button>
            <button className={styles.add_foto_btn}>
              <Add width={32} height={32} />
            </button>
            <img src="" alt="" />
          </div>
          <div className={styles.imgCard}>
            <div className={styles.box_input}>
              <input type="checkbox" id="foto1" />
              <label htmlFor="foto1" className={styles.label_title}>
                Головне
              </label>
            </div>
            <button className={styles.replay_btn}>
              <Replay />
            </button>
            <button className={styles.close_btn}>
              <Close />
            </button>
            <button className={styles.add_foto_btn}>
              <Add width={32} height={32} />
            </button>
            <img src="" alt="" />
          </div>
          <div className={styles.imgCard}>
            <div className={styles.box_input}>
              <input
                type="checkbox"
                id="foto1"
                className={styles.input_checkbox}
              />
              <label htmlFor="foto1" className={styles.label_title}>
                Головне
              </label>
            </div>
            <button className={styles.replay_btn}>
              <Replay />
            </button>
            <button className={styles.close_btn}>
              <Close />
            </button>
            <button className={styles.add_foto_btn}>
              <Add width={32} height={32} />
            </button>
            <img src="" alt="" />
          </div>
          <div className={styles.imgCard}>
            <div className={styles.box_input}>
              <input type="checkbox" id="foto1" />
              <label htmlFor="foto1" className={styles.label_title}>
                Головне
              </label>
            </div>
            <button className={styles.replay_btn}>
              <Replay />
            </button>
            <button className={styles.close_btn}>
              <Close />
            </button>
            <button className={styles.add_foto_btn}>
              <Add width={32} height={32} />
            </button>
            <img src="" alt="" />
          </div>
        </div>

        <h2 className={styles.main_info_title}>Основна інформація</h2>
        <div className={styles.box_item}>
          <div className={styles.box_description}>
            <h2 className={styles.description_car_title}>Опис автомобіля</h2>
            <div
              className={`${styles.mobileButton}  ${
                getWindowWidth() >= 768 ? styles.hide : ''
              }`}
              onClick={() => handleMobileBtnIsOpen('block2')}
            >
              {isOpen.block2 ? (
                <Arrowup width={24} height={24} />
              ) : (
                <Arrowdown width={24} height={24} />
              )}
            </div>
          </div>
          {isOpen.block2 && (
            <div className={styles.wrapper_item}>
              <div className={styles.listItem}>
                <textarea
                  id="story"
                  name="story"
                  rows={5}
                  cols={33}
                  className={styles.textarea}
                  maxLength={100}
                  placeholder="Text"
                  value={textValue}
                  style={{ resize: 'none' }}
                  onChange={handleTextareaChange}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Tип</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block3')}
              >
                {isOpen.block3 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block3 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      typeCars
                        ? typeCars.map(typeCar => typeCar.type)
                        : 'Нема співпадінь'
                    }
                    label="Тип"
                    startValue="Тип"
                    allOptionsLabel="Всі типи"
                    option={typeCategory}
                    setOption={setTypeCategory}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Бренд</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block4')}
              >
                {isOpen.block4 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block4 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={[...brands.map(brand => brand.brand)].sort(
                      (a, b) => a.localeCompare(b),
                    )}
                    label="Бренд"
                    startValue="Бренд"
                    option={carBrand}
                    setOption={setCarBrand}
                    allOptionsLabel="Всі бренди"
                    //  checkboxAllowed
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Модель</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block5')}
              >
                {isOpen.block5 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block5 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      carBrand !== 'Всі марки'
                        ? models.map(item => item.model)
                        : []
                    }
                    label="Модель"
                    startValue="Модель"
                    allOptionsLabel="Всі моделі"
                    option={carModel}
                    setOption={setCarModel}
                    carMark={carBrand}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Рік</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block6')}
              >
                {isOpen.block6 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block6 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="text"
                    placeholder="1970"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Тип кузову</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block7')}
              >
                {isOpen.block7 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block7 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      bodyTypes
                        ? bodyTypes.map((item: any) => item.bodyType)
                        : 'Нема співпадінь'
                    }
                    label="Тип кузову"
                    startValue="Тип кузову"
                    allOptionsLabel="Тип кузову"
                    option={selectedBodyType}
                    setOption={setSelectedBodyType}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Тип палива</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block8')}
              >
                {isOpen.block8 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block8 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      fuel
                        ? fuel.map((item: any) => item.fuelType)
                        : 'Нема співпадінь'
                    }
                    label="Тип палива"
                    startValue="Тип палива"
                    allOptionsLabel="Тип палива"
                    option={selectedFuelType}
                    setOption={setSelectedFuelType}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Об'єм двигуна</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block9')}
              >
                {isOpen.block9 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block9 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="1,1"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Коробка передач</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block10')}
              >
                {isOpen.block10 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block10 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      transmission
                        ? transmission.map((item: any) => item.transmission)
                        : 'Нема співпадінь'
                    }
                    label="Коробка передач"
                    startValue="Коробка передач"
                    allOptionsLabel="Коробка передач"
                    option={selectedTransmission}
                    setOption={setSelectedTransmission}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Пробіг</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block11')}
              >
                {isOpen.block11 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block11 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="1000"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>
                Потужність двигуна
              </h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block12')}
              >
                {isOpen.block12 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block12 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="50"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Привід</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block13')}
              >
                {isOpen.block13 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block13 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      driveType
                        ? driveType.map((item: any) => item.driveType)
                        : 'Нема співпадінь'
                    }
                    label="Привід"
                    startValue="Привід"
                    allOptionsLabel="Привід"
                    option={selectedDriveType}
                    setOption={setSelectedDriveType}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Область</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block14')}
              >
                {isOpen.block14 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block14 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      regions
                        ? regions.map(region => region.region)
                        : 'Нема співпадінь'
                    }
                    label="Область"
                    startValue="Оласть"
                    allOptionsLabel="Вся Україна"
                    option={selectedRegions}
                    setOption={setSelectedRegions}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Місто</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block15')}
              >
                {isOpen.block15 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block15 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      city && city.length > 0
                        ? city.map((item: CityItem) => item.city)
                        : 'Місто'
                    }
                    label="Місто"
                    startValue="Місто"
                    allOptionsLabel="Місто"
                    option={selectedCity}
                    setOption={setSelectedCity}
                  />
                </div>
              )}
            </div>
          </div>
          <h2 className={styles.main_info_title}>Технічна інформація</h2>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Колір</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block16')}
              >
                {isOpen.block16 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block16 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      transportColor &&
                      transportColor.map((item: any) => item.transportColor)
                    }
                    label="Колір"
                    startValue="Колір"
                    allOptionsLabel="Вся Україна"
                    option={selectedColor}
                    setOption={setSelectedColor}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Технічний стан</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block17')}
              >
                {isOpen.block17 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block17 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      transportCondition
                        ? transportCondition.map(
                            (item: any) => item.transportCondition,
                          )
                        : 'Нема співпадінь'
                    }
                    label="Технічний стан"
                    startValue="Технічний стан"
                    allOptionsLabel="Технічний стан"
                    option={selectedCondition}
                    setOption={setSelectedCondition}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Кількість дверей</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block18')}
              >
                {isOpen.block18 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block18 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="2"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Кількість місць</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block19')}
              >
                {isOpen.block19 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block19 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="2"
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Кількість осей</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block20')}
              >
                {isOpen.block20 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block20 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      numberAxles
                        ? numberAxles.map((item: any) => item.numberAxles)
                        : 'Нема співпадінь'
                    }
                    label="Кількість осей"
                    startValue="Кількість осей"
                    allOptionsLabel="Кількість осей"
                    option={selectedAxle}
                    setOption={setSelectedAxle}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>
                Конфігурація коліс
              </h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block21')}
              >
                {isOpen.block21 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block21 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      wheelConfiguration
                        ? wheelConfiguration.map(
                            (item: any) => item.wheelConfiguration,
                          )
                        : 'Нема співпадінь'
                    }
                    label="Конфігурація коліс"
                    startValue="Конфігурація коліс"
                    allOptionsLabel="Конфігурація коліс"
                    option={selectedWheelConfiguration}
                    setOption={setSelectedWheelConfiguration}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>
                {getWindowWidth() >= 768 ? (
                  <>
                    Країна з якої <br /> доставили:
                  </>
                ) : (
                  'Країна з якої доставили:'
                )}
              </h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block22')}
              >
                {isOpen.block22 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block22 && (
                <div className={styles.item_dropdown_box}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={
                      producingCountry
                        ? producingCountry.map(
                            (item: any) => item.producingCountry,
                          )
                        : 'Нема співпадінь'
                    }
                    label="Країна"
                    startValue="Країна"
                    allOptionsLabel="Весь Світ"
                    option={selectedProducingCountry}
                    setOption={setSelectedProducingCountry}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.box_item}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Можливість торгу</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block23')}
              >
                {isOpen.block23 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block23 && (
                <div className={styles.listItemSelectTitle}>
                  <label
                    htmlFor="No"
                    className={`${styles.itemTypeNo} ${
                      selectedOption === false ? styles.selected : ''
                    }`}
                  >
                    Ні
                    <input
                      type="radio"
                      name="option"
                      id="No"
                      value="Ні"
                      checked={selectedOption === false}
                      onChange={handleOptionChange}
                    />
                  </label>
                  <label
                    htmlFor="Yes"
                    className={`${styles.itemTypeYes}
                      ${selectedOption === true ? styles.selected : ''}
                      `}
                  >
                    Так
                    <input
                      type="radio"
                      name="option"
                      id="Yes"
                      value="Так"
                      checked={selectedOption === true}
                      onChange={handleOptionChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          {/* </div>
          </div>  */}
          <h2 className={styles.main_info_title}>Вартість</h2>
          <div className={styles.box_item_price}>
            <div className={styles.boxtitle}>
              <h2 className={styles.description_car_title}>Ціна</h2>
              <div
                className={`${styles.mobileButton}  ${
                  getWindowWidth() >= 768 ? styles.hide : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block24')}
              >
                {isOpen.block24 ? (
                  <Arrowup width={24} height={24} />
                ) : (
                  <Arrowdown width={24} height={24} />
                )}
              </div>
            </div>
            <div className={styles.listItem}>
              {isOpen.block24 && (
                <div className={styles.item_dropdown_box}>
                  <input
                    className={styles.inputPhone}
                    type="number"
                    placeholder="1000"
                  />
                </div>
              )}
            </div>
          </div>
          <button className={styles.btn_advers}>Розмістити оголошення</button>
        </div>
      </div>
    </section>
  );
};
